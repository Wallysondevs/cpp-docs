# std::list&lt;T,Allocator&gt;::emplace_back

```cpp
template< class... Args >
void emplace_back( Args&&... args );  // (desde C++11)
(até C++17)
template< class... Args >
reference emplace_back( Args&&... args );  // (desde C++17)
```

  
Adiciona um novo elemento ao final do container. O elemento é construído através de [std::allocator_traits::construct](<#/doc/memory/allocator_traits/construct>), que tipicamente usa placement-new para construir o elemento no local fornecido pelo container. Os argumentos args... são encaminhados para o construtor como [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... 

Nenhum iterator ou referência é invalidado. 

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
Requisitos de tipo   
-`T (o tipo de elemento do container)` deve atender aos requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>).   
  
### Valor de retorno

(nenhum)  | (até C++17)  
---|---
Uma referência ao elemento inserido.  | (desde C++17)  
  
### Complexidade

Constante. 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

  

### Exemplo

O código a seguir usa `emplace_back` para adicionar um objeto do tipo `President` a uma [std::list](<#/doc/container/list>). Ele demonstra como `emplace_back` encaminha parâmetros para o construtor de `President` e mostra como usar `emplace_back` evita a operação extra de cópia ou movimentação necessária ao usar [push_back](<#/doc/container/list/push_back>).

Execute este código
```
    #include <list>
    #include <cassert>
    #include <iostream>
    #include <string>
     
    struct President
    {
        std::string name;
        std::string country;
        int year;
     
        President(std::string p_name, std::string p_country, int p_year)
            : name(std::move(p_name)), country(std::move(p_country)), year(p_year)
        {
            std::cout << "I am being constructed.\n";
        }
     
        President(President&& other)
            : name(std::move(other.name)), country(std::move(other.country)), year(other.year)
        {
            std::cout << "I am being moved.\n";
        }
     
        President& operator=(const President& other) = default;
    };
     
    int main()
    {
        std::list<President> elections;
        std::cout << "emplace_back:\n";
        auto& ref = elections.emplace_back("Nelson Mandela", "South Africa", 1994);
        assert(ref.year == 1994 && "uses a reference to the created object (C++17)");
     
        std::list<President> reElections;
        std::cout << "\npush_back:\n";
        reElections.push_back(President("Franklin Delano Roosevelt", "the USA", 1936));
     
        std::cout << "\nContents:\n";
        for (President const& president: elections)
            std::cout << president.name << " was elected president of "
                      << president.country << " in " << president.year << ".\n";
     
        for (President const& president: reElections)
            std::cout << president.name << " was re-elected president of "
                      << president.country << " in " << president.year << ".\n";
    }
```

Saída: 
```
    emplace_back:
    I am being constructed.
     
    push_back:
    I am being constructed.
    I am being moved.
     
    Contents:
    Nelson Mandela was elected president of South Africa in 1994.
    Franklin Delano Roosevelt was re-elected president of the USA in 1936.
```

### Veja também

[ push_back](<#/doc/container/list/push_back>) |  adiciona um elemento ao final   
(função membro pública)  
[ emplace](<#/doc/container/list/emplace>)(C++11) |  constrói o elemento no local   
(função membro pública)