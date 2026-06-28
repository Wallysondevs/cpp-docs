# std::inplace_vector&lt;T,N&gt;::operator=

```cpp
constexpr inplace_vector& operator=( const inplace_vector& other );  // (1) (desde C++26)
constexpr inplace_vector& operator=( inplace_vector&& other )
noexcept(/* see below */);  // (2) (desde C++26)
constexpr inplace_vector& operator=( std::initializer_list<T> init );  // (3) (desde C++26)
```

  
Substitui o conteúdo do `inplace_vector`. 

1) [Operador de atribuição de cópia](<#/doc/language/as_operator>). Também um [operador de atribuição de cópia trivial](<#/doc/language/as_operator>), se [std::inplace_vector](<#/doc/container/inplace_vector>)<T, N> tiver um [destrutor trivial](<#/doc/language/destructor>), e [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; && [std::is_trivially_copy_assignable_v](<#/doc/types/is_copy_assignable>)&lt;T&gt; for verdadeiro. Substitui o conteúdo por uma cópia do conteúdo de `other`.

2) [Operador de atribuição de movimento](<#/doc/language/move_operator>). Também um [operador de atribuição de movimento trivial](<#/doc/language/move_operator>), se [std::inplace_vector](<#/doc/container/inplace_vector>)<T, N> tiver um [destrutor trivial](<#/doc/language/destructor>), e [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; && [std::is_trivially_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;T&gt; for verdadeiro. Substitui o conteúdo pelos de `other` usando move semantics (ou seja, os dados em `other` são movidos de `other` para este container). `other` fica em um estado válido, mas não especificado, depois disso.

3) Substitui o conteúdo pelos identificados pela initializer list `init`.

### Parâmetros

other  |  \-  |  outro `inplace_vector` a ser usado como fonte para inicializar os elementos do container   
---|---|---
init  |  \-  |  initializer list para inicializar os elementos do container   
  
### Complexidade

1,2) Linear no tamanho de `*this` e `other`.

3) Linear no tamanho de `*this` e `init`.

### Exceções

2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(N == 0

([std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)&lt;T&gt; &&  

[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;))

3) Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se `init.size() > N`.

### Exemplo

Execute este código
```cpp
    #include <initializer_list>
    #include <inplace_vector>
    #include <new>
    #include <print>
    #include <ranges>
    #include <string>
     
    int main()
    {
        std::inplace_vector<int, 4> x({1, 2, 3}), y;
        std::println("Initially:");
        std::println("x = {}", x);
        std::println("y = {}", y);
     
        std::println("Copy assignment copies data from x to y:");
        y = x; // overload (1)
        std::println("x = {}", x);
        std::println("y = {}", y);
     
        std::inplace_vector<std::string, 3> z, w{"\N{CAT}", "\N{GREEN HEART}"};
        std::println("Initially:");
        std::println("z = {}", z);
        std::println("w = {}", w);
     
        std::println("Move assignment moves data from w to z:");
        z = std::move(w); // overload (2)
        std::println("z = {}", z);
        std::println("w = {}", w); // w is in valid but unspecified state
     
        auto l = {4, 5, 6, 7};
        std::println("Assignment of initializer_list {} to x:", l);
        x = l; // overload (3)
        std::println("x = {}", x);
     
        std::println("Assignment of initializer_list with size bigger than N throws:");
        try
        {
            x = {1, 2, 3, 4, 5}; // throws: (initializer list size == 5) > (capacity N == 4)
        }
        catch(const std::bad_alloc& ex)
        {
            std::println("ex.what(): {}", ex.what());
        }
    }
```

Saída possível: 
```
    Initially:
    x = [1, 2, 3]
    y = []
    Copy assignment copies data from x to y:
    x = [1, 2, 3]
    y = [1, 2, 3]
    Initially:
    z = []
    w = ["🐈", "💚"]
    Move assignment moves data from w to z:
    z = ["🐈", "💚"]
    w = ["", ""]
    Assignment of initializer_list [4, 5, 6, 7] to x:
    x = [4, 5, 6, 7]
    Assignment of initializer_list with size bigger than N throws:
    ex.what(): std::bad_alloc
```

### Veja também

[ (constructor)](<#/doc/container/inplace_vector/inplace_vector>) |  constrói o `inplace_vector`   
(função membro pública)  
[ assign](<#/doc/container/inplace_vector/assign>) |  atribui valores ao container   
(função membro pública)