# std::raise

Definido no cabeçalho `[<csignal>](<#/doc/header/csignal>)`

```c
int raise( int sig );
```

  
Envia o sinal sig para o programa. O manipulador de sinal (especificado usando a função [std::signal()](<#/doc/utility/program/signal>)) é invocado. 

Se a estratégia de manipulação de sinal definida pelo usuário ainda não foi configurada usando [std::signal()](<#/doc/utility/program/signal>), é definido pela implementação se o sinal será ignorado ou se o manipulador padrão será invocado. 

### Parâmetros

sig  |  \-  |  o sinal a ser enviado. Pode ser um valor definido pela implementação ou um dos seguintes valores:  |  [ SIGABRTSIGFPESIGILLSIGINTSIGSEGVSIGTERM](<#/doc/utility/program/SIG_types>) |  define tipos de sinal   
(macro constante)  
  
  
  
  
### Valor de retorno

​0​ em caso de sucesso, valor diferente de zero em caso de falha. 

### Exemplo

Execute este código
```
    #include <csignal>
    #include <iostream>
     
    void signal_handler(int signal)
    {
        std::cout << "Received signal " << signal << '\n';
    }
     
    int main()
    {
        // Install a signal handler
        std::signal(SIGTERM, signal_handler);
     
        std::cout << "Sending signal " << SIGTERM << '\n';
        std::raise(SIGTERM);
    }
```

Saída possível: 
```
    Sending signal 15
    Received signal 15
```

### Veja também

[ signal](<#/doc/utility/program/signal>) | configura um manipulador de sinal para um sinal específico   
(função)  
[Documentação C](<#/>) para raise