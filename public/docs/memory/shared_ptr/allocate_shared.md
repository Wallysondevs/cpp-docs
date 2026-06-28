# std::allocate_shared, std::allocate_shared_for_overwrite

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class Alloc, class... Args >
shared_ptr<T> allocate_shared( const Alloc& alloc, Args&&... args );
(T não é um array)
template< class T, class Alloc >
shared_ptr<T> allocate_shared( const Alloc& alloc, std::size_t N );
(T é U[])
template< class T, class Alloc >
shared_ptr<T> allocate_shared( const Alloc& alloc );
(T é U[N])
template< class T, class Alloc >
shared_ptr<T> allocate_shared( const Alloc& alloc, std::size_t N,
const std::remove_extent_t<T>& u );
(T é U[])
template< class T, class Alloc >
shared_ptr<T> allocate_shared( const Alloc& alloc,
const std::remove_extent_t<T>& u );
(T é U[N])
template< class T, class Alloc >
shared_ptr<T> allocate_shared_for_overwrite( const Alloc& alloc );
(T não é U[])
template< class T, class Alloc >
shared_ptr<T> allocate_shared_for_overwrite( const Alloc& alloc, std::size_t N );
(T é U[])
```

1) Constrói um objeto do tipo `T` e o envolve em um [std::shared_ptr](<#/doc/memory/shared_ptr>) usando `args` como a lista de parâmetros para o construtor de `T`. O objeto é construído como se pela expressão ::new (pv) T(v)(até C++20)[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A2&gt;::construct(a, pv, v)(desde C++20), onde `pv` é um ponteiro `void*` interno para um armazenamento adequado para conter um objeto do tipo `T` e `a` é uma cópia do allocator reassociado a [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;. O armazenamento é tipicamente maior que `sizeof(T)` a fim de usar uma única alocação tanto para o bloco de controle do shared pointer quanto para o objeto `T`. O construtor de [std::shared_ptr](<#/doc/memory/shared_ptr>) chamado por esta função habilita `shared_from_this` com um ponteiro para o objeto recém-construído do tipo `T`. Toda a alocação de memória é feita usando uma cópia de `alloc`, que deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>). Esta sobrecarga participa da resolução de sobrecarga apenas se T não for um tipo de array.

2,3) O mesmo que (1), mas o objeto construído é um array possivelmente multidimensional cujos elementos não-array são inicializados como se pela expressão [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A2&gt;::construct(a2, pv) onde `a2` do tipo `A2` é a cópia do allocator reassociado para gerenciar objetos do tipo [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt;>. A sobrecarga (2) cria um array de tamanho N ao longo de sua primeira dimensão. Os elementos do array são inicializados em ordem crescente de seus endereços, e quando seu tempo de vida termina, são destruídos na ordem inversa de sua construção original.

4,5) O mesmo que (2,3), mas os elementos do array são inicializados a partir do valor padrão `u`. Se [std::remove_extent_t](<#/doc/types/remove_extent>)&lt;T&gt; não for um tipo de array, então isso é realizado como se pela mesma expressão de allocator que em (1), exceto que o allocator é reassociado a [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt;>. Caso contrário, isso é realizado como se inicializando cada elemento não-array do array (possivelmente multidimensional) com o elemento correspondente de `u` usando a mesma expressão de allocator que em (1), exceto que o allocator é reassociado ao tipo [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt;>. A sobrecarga (4) cria um array de tamanho N ao longo da primeira dimensão. Os elementos do array são inicializados em ordem crescente de seus endereços, e quando seu tempo de vida termina, são destruídos na ordem inversa de sua construção original.

6) O mesmo que (1) se `T` não for um tipo de array e (3) se `T` for `U[N]`, exceto que o objeto criado é [default-initialized](<#/doc/language/default_initialization>).

7) O mesmo que (2), exceto que os elementos individuais do array são [default-initialized](<#/doc/language/default_initialization>).

Para `allocate_shared`, o objeto (ou os elementos individuais do array para (2-5))(desde C++20) são destruídos através da expressão [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A2&gt;::destroy(a, p), onde `p` é um ponteiro para o objeto e `a` é uma cópia do allocator passado para `allocate_shared`, reassociado ao tipo do objeto sendo destruído.

Para `allocate_shared_for_overwrite`, o objeto (ou elementos individuais se `T` for um tipo de array) será destruído por p->~X(), onde `p` é um ponteiro para o objeto e `X` é seu tipo. | (desde C++20)

### Parâmetros

- **alloc** — o [Allocator](<#/doc/named_req/Allocator>) a ser usado
- **args...** — lista de argumentos com os quais uma instância de `T` será construída
- **N** — tamanho do array a ser usado
- **u** — o valor inicial para inicializar cada elemento do array

### Valor de retorno

[std::shared_ptr](<#/doc/memory/shared_ptr>) de uma instância do tipo `T`.

### Exceções

Pode lançar as exceções lançadas por Alloc::allocate() ou pelo construtor de `T`. Se uma exceção for lançada, (1) não tem efeito. Se uma exceção for lançada durante a construção do array, os elementos já inicializados são destruídos em ordem inversa(desde C++20).

### Notas

Assim como [std::make_shared](<#/doc/memory/shared_ptr/make_shared>), esta função tipicamente realiza apenas uma alocação, e coloca tanto o objeto `T` quanto o bloco de controle no bloco de memória alocado (o padrão recomenda, mas não exige isso; todas as implementações conhecidas fazem isso). Uma cópia de `alloc` é armazenada como parte do bloco de controle para que possa ser usada para desalocá-lo assim que as contagens de referência compartilhada e fraca atingirem zero.

Ao contrário dos [`construtores`](<#/doc/memory/shared_ptr/shared_ptr>) de `std::shared_ptr`, `std::allocate_shared` não aceita um deleter personalizado separado: o allocator fornecido é usado para a destruição do bloco de controle e do objeto `T`, e para a desalocação de seu bloco de memória compartilhado.

[std::shared_ptr](<#/doc/memory/shared_ptr>) suporta tipos de array (a partir de C++17), mas `std::allocate_shared` não. Esta funcionalidade é suportada por [`boost::allocate_shared`](<https://www.boost.org/doc/libs/1_66_0/libs/smart_ptr/doc/html/smart_ptr.html#make_shared>). | (até C++20)

Um construtor _habilita `shared_from_this`_ com um ponteiro `ptr` do tipo `U*` significa que ele determina se `U` possui uma classe base não ambígua e acessível(desde C++17) que é uma especialização de [std::enable_shared_from_this](<#/doc/memory/enable_shared_from_this>), e se sim, o construtor avalia if (ptr != nullptr && ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` ﻿.expired())
` `ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` `= [std::shared_ptr](<#/doc/memory/shared_ptr>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt;>
` `(*this, const_cast<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt;*>(ptr)); .

A atribuição a `_[weak_this](<#/doc/memory/enable_shared_from_this>)_` não é atômica e entra em conflito com qualquer acesso potencialmente concorrente ao mesmo objeto. Isso garante que futuras chamadas a [`shared_from_this()`](<#/doc/memory/enable_shared_from_this/shared_from_this>) compartilharão a propriedade com o [std::shared_ptr](<#/doc/memory/shared_ptr>) criado por este construtor de ponteiro bruto.

O teste ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` ﻿.expired() no código acima garante que `_[weak_this](<#/doc/memory/enable_shared_from_this>)_` não seja reatribuído se já indicar um proprietário. Este teste é exigido a partir de C++17.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_smart_ptr_for_overwrite`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | Criação de smart pointer com inicialização padrão (`std::allocate_shared_for_overwrite`, [std::make_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>), [std::make_unique_for_overwrite](<#/doc/memory/unique_ptr/make_unique>)); sobrecargas ([6,7](<#/doc/memory/shared_ptr/allocate_shared>))

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <memory>
    #include <memory_resource>
    #include <vector>
    
    class Value
    {
        int i;
    
    public:
        Value(int i) : i(i) { std::cout << "Value(), i = " << i << '\n'; }
        ~Value() { std::cout << "~Value(), i = " << i << '\n'; }
        void print() const { std::cout << "i = " << i << '\n'; }
    };
    
    int main()
    {
        // Create a polymorphic allocator using the monotonic buffer resource
        std::byte buffer[sizeof(Value) * 8];
        std::pmr::monotonic_buffer_resource resource(buffer, sizeof(buffer));
        std::pmr::polymorphic_allocator<Value> allocator(&resource);
    
        std::vector<std::shared_ptr<Value>> v;
    
        for (int i{}; i != 4; ++i)
            // Use std::allocate_shared with the custom allocator
            v.emplace_back(std::allocate_shared<Value>(allocator, i));
    
        for (const auto& sp : v)
            sp->print();
    
    } //< Todos os shared pointers serão automaticamente limpos quando saírem do escopo.
```

Saída:
```
    Value(), i = 0
    Value(), i = 1
    Value(), i = 2
    Value(), i = 3
    i = 0
    i = 1
    i = 2
    i = 3
    ~Value(), i = 0
    ~Value(), i = 1
    ~Value(), i = 2
    ~Value(), i = 3
```

### Veja também

[ (construtor)](<#/doc/memory/shared_ptr/shared_ptr>) | constrói um novo `shared_ptr`
(função membro pública)
[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(template de função)