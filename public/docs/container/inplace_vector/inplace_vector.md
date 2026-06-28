# std::inplace_vector&lt;T,N&gt;::inplace_vector

```cpp
constexpr inplace_vector() noexcept;  // (1) (desde C++26)
constexpr explicit inplace_vector( size_type count );  // (2) (desde C++26)
constexpr inplace_vector( size_type count, const T& value );  // (3) (desde C++26)
template< class InputIt >
constexpr inplace_vector( InputIt first, InputIt last );  // (4) (desde C++26)
template< /*container-compatible-range*/<T> R >
constexpr inplace_vector( std::from_range_t, R&& rg );  // (5) (desde C++26)
constexpr inplace_vector( const inplace_vector& other );  // (6) (desde C++26)
constexpr inplace_vector( inplace_vector&& other )
noexcept(N == 0 || std::is_nothrow_move_constructible_v<T>);  // (7) (desde C++26)
constexpr inplace_vector( std::initializer_list<T> init );  // (8) (desde C++26)
```

Constrói um novo `inplace_vector` a partir de uma variedade de fontes de dados.

1) Constrói um `inplace_vector` vazio cujo data() == nullptr e size() == 0.

2) Constrói um `inplace_vector` com `count` elementos inseridos por padrão.

3) Constrói um `inplace_vector` com `count` cópias de elementos com o valor `value`.

4) Constrói um `inplace_vector` com o conteúdo do range `[`first`, `last`)`.

5) Constrói um `inplace_vector` com o conteúdo do range `rg`.

Para a definição de /*container-compatible-range*/, veja [`ranges::to`](<#/doc/ranges/to>).

6) Um [construtor de cópia](<#/doc/language/copy_constructor>). Constrói um `inplace_vector` com a cópia do conteúdo de `other`.

O construtor é um [construtor de cópia trivial](<#/doc/language/copy_constructor>) se N > 0 e [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; forem ambos verdadeiros.

7) Um [construtor de movimento](<#/doc/language/move_constructor>). Constrói um `inplace_vector` com o conteúdo de `other` usando move semantics.

O construtor é um [construtor de movimento trivial](<#/doc/language/move_constructor>) se N > 0 e [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; forem ambos verdadeiros.

8) Constrói um `inplace_vector` com o conteúdo da initializer list `init`.

### Parâmetros

- **count** — o tamanho do container
- **value** — o valor para inicializar os elementos do container
- **first, last** — o range `[`first`, `last`)` para copiar os elementos
- **rg** — o range de valores para inicializar os elementos do container
- **other** — outro `inplace_vector` a ser usado como fonte para inicializar os elementos do container
- **init** — initializer list para inicializar os elementos do container
Requisitos de tipo
-`T` deve atender aos requisitos de [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) para usar as sobrecargas (2,3).

### Complexidade

1) Constante.

2,3) Linear em `count`.

4) Linear em [std::distance](<#/doc/iterator/distance>)(first, last).

5) Linear em std::[ranges::distance](<#/doc/iterator/ranges/distance>)(rg).

6,7) Linear no tamanho de `other`.

8) Linear no tamanho de `init`.

### Exceções

2,3) Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se `count` > N.

5) Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se std::[ranges::size](<#/doc/ranges/size>)(rg) > N.

8) Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se init.size() > N.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <initializer_list>
    #include <inplace_vector>
    #include <new>
    #include <print>
    #include <ranges>
    
    int main()
    {
        std::inplace_vector<int, 4> v1; // overload (1)
        assert(v1.size() == 0 && v1.capacity() == 4);
    
        std::inplace_vector<int, 0> v2; // overload (1), N == 0 is allowed
        assert(v2.size() == 0 && v2.capacity() == 0);
    
        std::inplace_vector<int, 5> v3(3); // overload (2)
        assert(v3.size() == 3 && v3.capacity() == 5);
        std::println("v3 = {}", v3);
    
        try
        {
            std::inplace_vector<int, 3> v(4); // overload (2), throws: count > N
        }
        catch(const std::bad_alloc& ex1)
        {
            std::println("ex1.what(): {}", ex1.what());
        }
    
        std::inplace_vector<int, 5> v4(3, 8); // overload (3)
        assert(v4.size() == 3 && v4.capacity() == 5);
        std::println("v4 = {}", v4);
    
        try
        {
            std::inplace_vector<int, 3> v(4, 2); // overload (3), throws: count > N
        }
        catch(const std::bad_alloc& ex2)
        {
            std::println("ex2.what(): {}", ex2.what());
        }
    
        const auto init = {1, 2, 3};
    
        std::inplace_vector<int, 4> v5(init.begin(), init.end()); // overload (4)
        assert(v5.size() == 3 && v5.capacity() == 4);
        std::println("v5 = {}", v5);
    
        std::inplace_vector<int, 4> v6(std::from_range, init); // overload (5)
        assert(v6.size() == 3 && v6.capacity() == 4);
        std::println("v6 = {}", v6);
    
        std::inplace_vector<int, 4> v7(v6); // overload (6)
        assert(v7.size() == 3 && v7.capacity() == 4);
        std::println("v7 = {}", v7);
        assert(v6.size() == 3);
    
        std::inplace_vector<int, 4> v8(std::move(v6)); // overload (7)
        // Note that after the move v6 is left in valid but indeterminate state.
        assert(v8.size() == 3 && v8.capacity() == 4);
        std::println("v8 = {}", v8);
    
        std::inplace_vector<int, 4> v9(init); // overload (8)
        assert(v9.size() == 3 && v9.capacity() == 4);
        std::println("v9 = {}", v9);
    
        try
        {
            std::inplace_vector<int, 2> v(init); // overload (8), throws: init.size() > N
        }
        catch(const std::bad_alloc& ex3)
        {
            std::println("ex3.what(): {}", ex3.what());
        }
    }
```

Saída possível:
```
    v3 = [0, 0, 0]
    ex1.what(): std::bad_alloc
    v4 = [42, 42, 42]
    ex2.what(): std::bad_alloc
    v5 = [1, 2, 3]
    v6 = [1, 2, 3]
    v7 = [1, 2, 3]
    v8 = [1, 2, 3]
    v9 = [1, 2, 3]
    ex3.what(): std::bad_alloc
```

### Veja também

[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ capacity](<#/doc/container/inplace_vector/capacity>)[static] | retorna o número de elementos que podem ser armazenados no armazenamento alocado atualmente
(função membro estática pública)
[ data](<#/doc/container/inplace_vector/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)
[ size](<#/doc/container/inplace_vector/size>) | retorna o número de elementos
(função membro pública)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(modelo de função)