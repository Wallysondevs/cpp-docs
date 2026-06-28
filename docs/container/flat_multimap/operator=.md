# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::operator=

```cpp
flat_multimap& operator=( const flat_multimap& other );  // (1) (desde C++23)
(declarado implicitamente)
flat_multimap& operator=( flat_multimap&& other );  // (2) (desde C++23)
(declarado implicitamente)
flat_multimap& operator=( std::initializer_list<value_type> ilist );  // (3) (desde C++23)
```

Substitui o conteúdo do adaptador de container com o conteúdo do argumento fornecido.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other. Efetivamente chama `c = other.c; comp = other.comp;`.

2) Operador de atribuição por movimento. Substitui o conteúdo pelo de other usando move semantics. Efetivamente chama `c = std::move(other.c); comp = std::move(other.comp);`.

3) Substitui o conteúdo pelos identificados pela lista de inicializadores `ilist`.

### Parâmetros

other  |  \-  |  outro adaptador de container a ser usado como fonte
---|---|---
ilist  |  \-  |  lista de inicializadores a ser usada como fonte

### Valor de retorno

`*this`

### Complexidade

1,2) Equivalente à do `operator=` do container subjacente.

3) Linear no tamanho de `*this` e `ilist`.

### Exemplo

Execute este código
```cpp
    #include <flat_map>
    #include <initializer_list>
    #include <print>
    #include <utility>
    
    int main()
    {
        std::flat_multimap<int, int> x{{1, 1}, {2, 2}, {3, 3}}, y, z;
        const auto w = {std::pair<const int, int>{4, 4}, {5, 5}, {6, 6}, {7, 7}};
    
        std::println("Initially:");
        std::println("x = {}", x);
        std::println("y = {}", y);
        std::println("z = {}", z);
    
        y = x; // overload (1)
        std::println("Copy assignment copies data from x to y:");
        std::println("x = {}", x);
        std::println("y = {}", y);
    
        z = std::move(x); // overload (2)
        std::println("Move assignment moves data from x to z, modifying both x and z:");
        std::println("x = {}", x);
        std::println("z = {}", z);
    
        z = w; // overload (3)
        std::println("Assignment of initializer_list w to z:");
        std::println("w = {}", w);
        std::println("z = {}", z);
    }
```

Saída:
```
    Initially:
    x = {1: 1, 2: 2, 3: 3}
    y = {}
    z = {}
    Copy assignment copies data from x to y:
    x = {1: 1, 2: 2, 3: 3}
    y = {1: 1, 2: 2, 3: 3}
    Move assignment moves data from x to z, modifying both x and z:
    x = {}
    z = {1: 1, 2: 2, 3: 3}
    Assignment of initializer_list w to z:
    w = {4: 4, 5: 5, 6: 6, 7: 7}
    z = {4: 4, 5: 5, 6: 6, 7: 7}
```

### Veja também

[ (construtor)](<#/doc/container/flat_multimap/flat_multimap>) |  constrói o `flat_multimap`
(função membro pública)
[ replace](<#/doc/container/flat_multimap/replace>) |  substitui os containers subjacentes
(função membro pública)