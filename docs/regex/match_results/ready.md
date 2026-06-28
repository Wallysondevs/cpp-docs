# std::match_results&lt;BidirIt,Alloc&gt;::ready

bool ready() const; |  |  (desde C++11)  

  
Indica se os resultados da correspondência estão prontos (válidos) ou não. 

Um resultado de correspondência construído por padrão não possui estado de resultado (não está _pronto_), e só pode ser tornado pronto por um dos algoritmos de regex. O estado _pronto_ implica que todos os resultados da correspondência foram totalmente estabelecidos. 

O resultado da chamada da maioria das funções membro do objeto `match_results` que não está _pronto_ é comportamento indefinido. 

### Valor de retorno

true se os resultados da correspondência estiverem prontos, false caso contrário. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
     
    int main()
    {
        std::string target("big-red-cat");
        std::smatch sm;
        std::cout << "Default constructed smatch is "
                  << (sm.ready() ? "ready.\n" : "not ready.\n");
     
        std::regex re1(".*-red-.*");
        std::regex_search(target, sm, re1);
     
        std::cout << "After search, smatch is "
                  << (sm.ready() ? "ready.\n" : "not ready.\n");
    }
```

Saída: 
```
    Default constructed smatch is not ready.
    After search, smatch is ready.
```