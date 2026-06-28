Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class... Args >
shared_ptr<T> make_shared( Args&&... args );
(T is not array)
template< class T >
shared_ptr<T> make_shared( std::size_t N );
(T is U[])
template< class T >
shared_ptr<T> make_shared();
(T is U[N])
template< class T >
shared_ptr<T> make_shared( std::size_t N, const std::remove_extent_t<T>& u );
(T is U[])
template< class T >
shared_ptr<T> make_shared( const std::remove_extent_t<T>& u );
(T is U[N])
template< class T >
shared_ptr<T> make_shared_for_overwrite();
(T is not U[])
template< class T >
shared_ptr<T> make_shared_for_overwrite( std::size_t N );
(T is U[])
```

1) Constrói um objeto do tipo `T` e o envolve em um [std::shared_ptr](<#/doc/memory/shared_ptr>) usando `args` como a lista de parâmetros para o construtor de `T`. O objeto é construído como se pela expressão `::new (pv) T([std::forward](<#/doc/utility/forward>)<Args>(args)...)`, onde `pv` é um ponteiro `void*` interno para um armazenamento adequado para conter um objeto do tipo `T`. O armazenamento é tipicamente maior que `sizeof(T)` a fim de usar uma única alocação tanto para o bloco de controle do shared pointer quanto para o objeto `T`. O construtor de `std::shared_ptr` chamado por esta função habilita `shared_from_this` com um ponteiro para o objeto `T` recém-construído. Esta sobrecarga participa da resolução de sobrecarga apenas se `T` não for um tipo array. | (desde C++20)

2,3) O mesmo que (1), mas o objeto construído é um array possivelmente multidimensional cujos elementos não-array do tipo [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)&lt;T&gt; são inicializados por valor como se pela expressão placement-new `::new(pv) [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)<T>()`. A sobrecarga (2) cria um array de tamanho `N` ao longo da primeira dimensão. Os elementos do array são inicializados em ordem crescente de seus endereços, e quando seu tempo de vida termina são destruídos na ordem inversa de sua construção original.

4,5) O mesmo que (2,3), mas cada elemento é inicializado a partir do valor padrão `u`. Se `U` não for um tipo array, então isso é realizado como se pela mesma expressão placement-new que em (1); caso contrário, isso é realizado como se inicializando cada elemento não-array do array (possivelmente multidimensional) com o elemento correspondente de `u` com a mesma expressão placement-new que em (1). A sobrecarga (4) cria um array de tamanho `N` ao longo da primeira dimensão. Os elementos do array são inicializados em ordem crescente de seus endereços, e quando seu tempo de vida termina são destruídos na ordem inversa de sua construção original.

6) O mesmo que (1) se `T` não for um tipo array e (3) se `T` for `U[N]`, exceto que o objeto criado é [inicializado por padrão](<#/doc/language/default_initialization>).

7) O mesmo que (2), exceto que os elementos individuais do array são [inicializados por padrão](<#/doc/language/default_initialization>).

Em cada caso, o objeto (ou elementos individuais se `T` for um tipo array)(desde C++20) será destruído por `p->~X()`, onde `p` é um ponteiro para o objeto e `X` é seu tipo.

### Parâmetros

- **args** — lista de argumentos com os quais uma instância de `T` será construída
- **N** — tamanho do array a ser usado
- **u** — o valor inicial para inicializar cada elemento do array

### Valor de retorno

[std::shared_ptr](<#/doc/memory/shared_ptr>) de uma instância do tipo `T`.

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou qualquer exceção lançada pelo construtor de `T`. Se uma exceção for lançada, as funções não têm efeito. Se uma exceção for lançada durante a construção do array, os elementos já inicializados são destruídos em ordem inversa.(desde C++20)

### Notas

Esta função pode ser usada como uma alternativa a [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(new T(args...)). Os compromissos são:

  * [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(new T(args...)) realiza pelo menos duas alocações (uma para o objeto `T` e uma para o bloco de controle do shared pointer), enquanto `std::make_shared<T>` tipicamente realiza apenas uma alocação (o padrão recomenda, mas não exige isso; todas as implementações conhecidas fazem isso).
  * Se qualquer [std::weak_ptr](<#/doc/memory/weak_ptr>) referenciar o bloco de controle criado por `std::make_shared` após o término do tempo de vida de todos os shared owners, a memória ocupada por `T` persiste até que todos os weak owners também sejam destruídos, o que pode ser indesejável se `sizeof(T)` for grande.
  * [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(new T(args...)) pode chamar um construtor não-público de `T` se executado em um contexto onde ele é acessível, enquanto `std::make_shared` requer acesso público ao construtor selecionado.
  * Ao contrário dos construtores de [std::shared_ptr](<#/doc/memory/shared_ptr>), `std::make_shared` não permite um deleter personalizado.
  * `std::make_shared` usa `::new`, então se algum comportamento especial foi configurado usando um [`operator new`](<#/doc/memory/new/operator_new>) específico da classe, ele será diferente de [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(new T(args...)).

  * [std::shared_ptr](<#/doc/memory/shared_ptr>) suporta tipos array (a partir de C++17), mas `std::make_shared` não. Esta funcionalidade é suportada por [`boost::make_shared`](<https://www.boost.org/doc/libs/1_66_0/libs/smart_ptr/doc/html/smart_ptr.html#make_shared>).

| (até C++20)

  * código como `f([std::shared_ptr](<#/doc/memory/shared_ptr>)<int>(new int(42)), g())` pode causar um vazamento de memória se `g` for chamado após `new int(42)` e lançar uma exceção, enquanto `f(std::make_shared<int>(42), g())` é seguro, já que duas chamadas de função [nunca são intercaladas](<#/doc/language/eval_order>).

| (até C++17)

Um construtor _habilita `shared_from_this`_ com um ponteiro `ptr` do tipo `U*` significa que ele determina se `U` possui uma classe base não ambígua e acessível(desde C++17) que é uma especialização de [std::enable_shared_from_this](<#/doc/memory/enable_shared_from_this>), e se sim, o construtor avalia
` `if (ptr != nullptr && ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` ﻿.expired())`
` `ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` `= [std::shared_ptr](<#/doc/memory/shared_ptr>)<[std::remove_cv_t](<#/doc/types/remove_cv>)<U>>`
` `(*this, const_cast<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;U&gt;*>(ptr)); .`

A atribuição a `_[weak_this](<#/doc/memory/enable_shared_from_this>)_` não é atômica e entra em conflito com qualquer acesso potencialmente concorrente ao mesmo objeto. Isso garante que futuras chamadas a [`shared_from_this()`](<#/doc/memory/enable_shared_from_this/shared_from_this>) compartilhariam a propriedade com o [std::shared_ptr](<#/doc/memory/shared_ptr>) criado por este construtor de ponteiro bruto.

O teste `ptr->`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` ﻿.expired()` no código acima garante que `_[weak_this](<#/doc/memory/enable_shared_from_this>)_` não seja reatribuído se já indicar um proprietário. Este teste é exigido a partir de C++17.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_shared_ptr_arrays`](<#/doc/feature_test>) | [`201707L`](<#/>) | (C++20) | Suporte a arrays de [`std::make_shared`](<#/doc/memory/shared_ptr/make_shared>); sobrecargas ([2-5](<#/doc/memory/shared_ptr/make_shared>))
[`__cpp_lib_smart_ptr_for_overwrite`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | Criação de smart pointer com inicialização padrão ([std::allocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>), `std::make_shared_for_overwrite`, [std::make_unique_for_overwrite](<#/doc/memory/unique_ptr/make_unique>)); sobrecargas ([6,7](<#/doc/memory/shared_ptr/make_shared>))

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <type_traits>
    #include <vector>
    
    struct C
    {
        // constructors needed (until C++20)
        C(int i) : i(i) {}
        C(int i, float f) : i(i), f(f) {}
        int i;
        float f{};
    };
    
    int main()
    {
        // using `auto` for the type of `sp1`
        auto sp1 = std::make_shared<C>(1); // overload (1)
        static_assert(std::is_same_v<decltype(sp1), std::shared_ptr<C>>);
        std::cout << "sp1->{ i:" << sp1->i << ", f:" << sp1->f << " }\n";
    
        // being explicit with the type of `sp2`
        std::shared_ptr<C> sp2 = std::make_shared<C>(2, 3.0f); // overload (1)
        static_assert(std::is_same_v<decltype(sp2), std::shared_ptr<C>>);
        static_assert(std::is_same_v<decltype(sp1), decltype(sp2)>);
        std::cout << "sp2->{ i:" << sp2->i << ", f:" << sp2->f << " }\n";
    
        // shared_ptr to a value-initialized float[64]; overload (2):
        std::shared_ptr<float[]> sp3 = std::make_shared<float[]>(64);
    
        // shared_ptr to a value-initialized long[5][3][4]; overload (2):
        std::shared_ptr<long[][3][4]> sp4 = std::make_shared<long[][3][4]>(5);
    
        // shared_ptr to a value-initialized short[128]; overload (3):
        std::shared_ptr<short[128]> sp5 = std::make_shared<short[128]>();
    
        // shared_ptr to a value-initialized int[7][6][5]; overload (3):
        std::shared_ptr<int[7][6][5]> sp6 = std::make_shared<int[7][6][5]>();
    
        // shared_ptr to a double[256], where each element is 2.0; overload (4):
        std::shared_ptr<double[]> sp7 = std::make_shared<double[]>(256, 2.0);
    
        // shared_ptr to a double[7][2], where each double[2]
        // element is {3.0, 4.0}; overload (4):
        std::shared_ptr<double[][2]> sp8 = std::make_shared<double[][2]>(7, {3.0, 4.0});
    
        // shared_ptr to a vector<int>[4], where each vector
        // has contents {5, 6}; overload (4):
        std::shared_ptr<std::vector<int>[]> sp9 =
            std::make_shared<std::vector<int>[]>(4, {5, 6});
    
        // shared_ptr to a float[512], where each element is 1.0; overload (5):
        std::shared_ptr<float[512]> spA = std::make_shared<float[512]>(1.0);
    
        // shared_ptr to a double[6][2], where each double[2] element
        // is {1.0, 2.0}; overload (5):
        std::shared_ptr<double[6][2]> spB = std::make_shared<double[6][2]>({1.0, 2.0});
    
        // shared_ptr to a vector<int>[4], where each vector
        // has contents {5, 6}; overload (5):
        std::shared_ptr<std::vector<int>[4]> spC =
            std::make_shared<std::vector<int>[4]>({5, 6});
    }
```

Saída:
```
    sp1->{ i:1, f:0 }
    sp2->{ i:2, f:3 }
```

### Veja também

[ (constructor)](<#/doc/memory/shared_ptr/shared_ptr>) | constrói um novo `shared_ptr`
(função membro pública)
[ allocate_sharedallocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto alocado usando um alocador
(modelo de função)
[ enable_shared_from_this](<#/doc/memory/enable_shared_from_this>)(C++11) | permite que um objeto crie um `shared_ptr` referindo-se a si mesmo
(modelo de classe)
[ make_uniquemake_unique_for_overwrite](<#/doc/memory/unique_ptr/make_unique>)(C++14)(C++20) | cria um unique pointer que gerencia um novo objeto
(modelo de função)
[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)