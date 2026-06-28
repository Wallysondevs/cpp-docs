# std::flat_set&lt;Key,Compare,KeyContainer&gt;::operator=

```cpp
flat_set& operator=( const flat_set& other );  // (1) (desde C++23)
(declarado implicitamente)
flat_set& operator=( flat_set&& other );  // (2) (desde C++23)
(declarado implicitamente)
flat_set& operator=( std::initializer_list<key_type> ilist );  // (3) (desde C++23)
```

Substitui o conteúdo do adaptador de container com o conteúdo do argumento fornecido.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other. Efetivamente chama `c = other.c; comp = other.comp;`.

2) Operador de atribuição por movimento (move assignment). Substitui o conteúdo com o de other usando move semantics. Efetivamente chama `c = std::move(other.c); comp = std::move(other.comp);`.

3) Substitui o conteúdo com aqueles identificados pela initializer list `ilist`.

### Parâmetros

- **other** — outro adaptador de container a ser usado como fonte
- **ilist** — initializer list a ser usada como fonte

### Valor de retorno

`*this`

### Complexidade

1,2) Equivalente à do `operator=` do container subjacente.

3) Linear no tamanho de `*this` e `ilist`.

### Exemplo

Execute este código
```cpp
    #include <flat_set>
    #include <initializer_list>
    #include <print>
    
    int main()
    {
        std::flat_set<int> x{1, 2, 3}, y, z;
        const auto w = {4, 5, 6, 7};
    
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
    x = {1, 2, 3}
    y = {}
    z = {}
    Copy assignment copies data from x to y:
    x = {1, 2, 3}
    y = {1, 2, 3}
    Move assignment moves data from x to z, modifying both x and z:
    x = {}
    z = {1, 2, 3}
    Assignment of initializer_list w to z:
    w = {4, 5, 6, 7}
    z = {4, 5, 6, 7}
```

### Veja também

[ (constructor)](<#/doc/container/flat_set/flat_set>) | constrói o `flat_set`
(função membro pública)
[ replace](<#/doc/container/flat_set/replace>) | substitui o container subjacente
(função membro pública)