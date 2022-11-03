# import requests

# response = requests.post(
#     'http://url.com/Login/Authenticate',
#     data={
#         "CPF": "txtCPF",
#         "Dt_nasc": "txtDataNascimento"
#     }

# )

# print(response.content) #get the response from whatever server     
# import mysql.connector
# from mysql.connector import Error
 
# mydb = mysql.connector.connect(
#   host='localhost',
#   user='root',
#   passwd='Senai125',
#   port = '3306',
#   database='python_db'
# )
 


z = 0

class Programa:  # classe programa com sistema CRUD
    def __init__ (self,nome,CPF,dt_nasc,Telefone,RA):
      self.nome = nome
      self.CPF = CPF
      self.dt_nasc = dt_nasc
      self.telefone = Telefone
      self.RA = RA


    def cadastrar(self):
      self.nome = str(input("Digite seu nome: "))
      while self.nome == "":
        self.nome = str(input("Não digite um nome vazio; por favor digite seu nome: "))

      self.CPF = str(input("Digite seu CPF: "))
      while self.CPF.__len__() != 11 or self.CPF == "":
        self.CPF = str(input("Caracteres incorretos, lembre de retirar os pontos e traços, digite novamente: "))

      self.dt_nasc = str(input("Digite sua data de nascimento com as barras: "))
      while self.dt_nasc.__len__() != 10 or self.dt_nasc == "":
        self.dt_nasc = str(input("Caracteres mais do que o suficiente, digite novamente: "))

      self.telefone = str(input("Digite seu telefone: "))
      while self.telefone == "":
        self.telefone = str(input("Por favor não digite um telefone vazio; por favor digite seu telefone: "))

      self.RA = int(input("Digite seu RA(Registro do aluno): "))
      num = self.RA
      contador = 0
      while num >=1 :
        contador += 1
        num/=10
      while contador != 10:
        self.RA = int(input("Digite um RA(Registro do aluno) valido: "))
        num = self.RA
        contador = 0
        while num >=1 :
          contador += 1
          num/=10
      print("Bem vindo", self.nome)





    def atualizar(self):
      x = 0
      while x != 5 :
        print("Digite 1 para alterar o nome, digite 2 para alterar o CPF, 3 para alterar a data de nascimento. ")
        x = int(input("4 para alterar o telefone e 5 para sair. "))

        if x == 1 :
          print()
          self.nome = str(input("Digite seu novo nome: "))
          while self.nome == "":
             self.nome = str(input("Não digite um nome vazio; por favor digite seu novo nome: "))

        if x == 2 :
          print()
          self.CPF = str(input("Digite o novo CPF: "))
          while self.CPF.__len__() != 11 or self.CPF == "":
           self.CPF = str(input("Caracteres insuficientes ou mais do que o necessário, digite novamente: "))

        if x == 3 :
         print()
         self.dt_nasc = str(input("Digite sua nova data de nascimento: "))
         while self.dt_nasc.__len__() != 10 or self.dt_nasc == "":
           self.dt_nasc = str(input("Caracteres mais do que o suficiente, digite novamente: "))

        if x == 4: 
          print()
          self.telefone = str(input("Digite seu novo telefone: "))
          while self.telefone == "":
            self.telefone = str(input("Por favor não digite um telefone vazio; por favor digite seu telefone: "))
    
    def deletar(self):
      x = 0
      while  x != 2 or x == "":
        x =  int(input("Digite o numero do R.A do usuário que deseja deletar ou digite 2 para sair: "))

        if x == self.RA:
          self.nome = ""
          self.CPF = ""
          self.dt_nasc = ""
          self.telefone = ""
          self.RA = 0
          print ("Usuário deletado")
          x=2
        
        else:
          print("Número inválido.")

    
    def visualizar(self):
      print("\n"*14)
      print("Dados do usuário:")
      print("Nome: "+self.nome)
      print("CPF: "+self.CPF)
      print("Data de nascimento: "+self.dt_nasc)
      print("Telefone: "+ self.telefone)
      print("R.A :", self.RA)






X = 0
y = 0
Programa = Programa("","",0,"",0)
while  X != 1 :
  
    while z == 1:
      y = int(input("Digite 1 para cadastrar, 2 para atualizar, 3 para deletar, 4 para visualizar dados e 5 para sair: "))
      if y == 1:
        Programa.cadastrar()
      elif y == 2:
        Programa.atualizar()

      elif y == 3:
        Programa.deletar()
        z = 0

      elif y == 4:
        Programa.visualizar()

      elif y == 5:
        exit()
      else:
        print("Erro, numero invalido !")

    while z == 0: 
      y = int(input("Digite 1 para cadastrar e 5 para sair: "))
      print()

      if y == 1:
        Programa.cadastrar()
        z = 1

      elif y == 5:
        exit()

      else:
        print("Erro, numero invalido !")