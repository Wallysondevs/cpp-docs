# std::deque&lt;T,Allocator&gt;::emplace

```cpp
template< class... Args >
iterator emplace( const_iterator pos, Args&&... args );  // (desde C++11)
```

Insere um novo elemento no contêiner diretamente antes de `pos`.

O elemento é construído através de [std::allocator_traits::construct](<#/doc/memory/allocator_traits/construct>), que tipicamente usa placement-new para construir o elemento no local em uma posição fornecida pelo contêiner. No entanto, se a posição requerida tiver sido ocupada por um elemento existente, o elemento inserido é construído em outra posição primeiro, e então move-atribuído para a posição requerida.

Os argumentos `args...` são encaminhados para o construtor como [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... `args...` podem se referir direta ou indiretamente a um valor no contêiner.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) são invalidados. Referências também são invalidadas, a menos que `pos ==` `[`begin()`](<#/doc/container/deque/begin>) ou `pos ==` `[`end()`](<#/doc/container/deque/end>), caso em que não são invalidadas.

### Parâmetros

- **pos** — iterator antes do qual o novo elemento será construído
- **args** — argumentos a serem encaminhados para o construtor do elemento
Requisitos de tipo
-`T (o tipo de elemento do contêiner)` deve atender aos requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>), [MoveInsertable](<#/doc/named_req/MoveInsertable>) e [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>).

### Valor de retorno

Iterator apontando para o elemento inserido (emplaced).

### Complexidade

Linear no menor das distâncias entre `pos` e qualquer uma das extremidades do contêiner.

### Exceções

Se uma exceção for lançada que não seja pelo construtor de cópia, construtor de movimento, operador de atribuição ou operador de atribuição de movimento de `T`, ou se uma exceção for lançada enquanto `emplace` é usado para inserir um único elemento em qualquer uma das extremidades, não há efeitos (garantia de exceção forte).

Caso contrário, os efeitos são não especificados.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <deque>
     
    struct A
    {
        std::string s;
     
        A(std::string str) : s(std::move(str)) { std::cout << " constructed\n"; }
     
        A(const A& o) : s(o.s) { std::cout << " copy constructed\n"; }
     
        A(A&& o) : s(std::move(o.s)) { std::cout << " move constructed\n"; }
     
        A& operator=(const A& other)
        {
            s = other.s;
            std::cout << " copy assigned\n";
            return *this;
        }
     
        A& operator=(A&& other)
        {
            s = std::move(other.s);
            std::cout << " move assigned\n";
            return *this;
        }
    };
     
    int main()
    {
        std::deque<A> container;
     
        std::cout << "construct 2 times A:\n";
        A two{"two"};
        A three{"three"};
     
        std::cout << "emplace:\n";
        container.emplace(container.end(), "one");
     
        std::cout << "emplace with A&:\n";
        container.emplace(container.end(), two);
     
        std::cout << "emplace with A&&:\n";
        container.emplace(container.end(), std::move(three));
     
        std::cout << "content:\n";
        for (const auto& obj : container)
            std::cout << ' ' << obj.s;
        std::cout << '\n';
    }
```

Output:
```
    construct 2 times A:
     constructed
     constructed
    emplace:
     constructed
    emplace with A&:
     copy constructed
    emplace with A&&:
     move constructed
    content:
     one two three
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2164](<https://cplusplus.github.io/LWG/issue2164>) | C++11 | não estava claro se os argumentos podem se referir ao contêiner | esclarecido

### Ver também

[ insert](<#/doc/container/deque/insert>) | insere elementos
(função membro pública)
[ emplace_back](<#/doc/container/deque/emplace_back>)(desde C++11) | constrói um elemento no local no final
(função membro pública)