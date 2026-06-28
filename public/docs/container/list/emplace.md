# std::list&lt;T,Allocator&gt;::emplace

```cpp
template< class... Args >
iterator emplace( const_iterator pos, Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container diretamente antes de pos. 

O elemento é construído através de [std::allocator_traits::construct](<#/doc/memory/allocator_traits/construct>), que usa placement-new para construir o elemento no local fornecido pelo container. 

Os argumentos args... são encaminhados para o construtor como [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... args... podem se referir direta ou indiretamente a um valor no container. 

Nenhum iterator ou referência é invalidado. 

### Parâmetros

pos  |  \-  |  iterator antes do qual o novo elemento será construído   
---|---|---
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
Requisitos de tipo   
-`T (o tipo de elemento do container)` deve atender aos requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>).   
  
### Valor de retorno

Iterator apontando para o elemento inserido. 

### Complexidade

Constante. 

### Exceções

Se uma exceção for lançada (por exemplo, pelo construtor), o container é deixado sem modificações, como se esta função nunca tivesse sido chamada (garantia de exceção forte). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <list>
     
    struct A
    {
        std::string s;
     
        A(std::string str) : s(std::move(str)) { std::cout << " construído\n"; }
     
        A(const A& o) : s(o.s) { std::cout << " copiado construído\n"; }
     
        A(A&& o) : s(std::move(o.s)) { std::cout << " movido construído\n"; }
     
        A& operator=(const A& other)
        {
            s = other.s;
            std::cout << " copiado atribuído\n";
            return *this;
        }
     
        A& operator=(A&& other)
        {
            s = std::move(other.s);
            std::cout << " movido atribuído\n";
            return *this;
        }
    };
     
    int main()
    {
        std::list<A> container;
     
        std::cout << "constrói 2 vezes A:\n";
        A two{"two"};
        A three{"three"};
     
        std::cout << "emplace:\n";
        container.emplace(container.end(), "one");
     
        std::cout << "emplace com A&:\n";
        container.emplace(container.end(), two);
     
        std::cout << "emplace com A&&:\n";
        container.emplace(container.end(), std::move(three));
     
        std::cout << "conteúdo:\n";
        for (const auto& obj : container)
            std::cout << ' ' << obj.s;
        std::cout << '\n';
    }
```

Saída: 
```
    constrói 2 vezes A:
     construído
     construído
    emplace:
     construído
    emplace com A&:
     copiado construído
    emplace com A&&:
     movido construído
    conteúdo:
     one two three
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2164](<https://cplusplus.github.io/LWG/issue2164>) | C++11  | não estava claro se os argumentos podem se referir ao container  | esclarecido   
  
### Veja também

[ insert](<#/doc/container/list/insert>) | insere elementos   
(função membro pública)  
[ emplace_back](<#/doc/container/list/emplace_back>)(desde C++11) | constrói um elemento no local no final   
(função membro pública)