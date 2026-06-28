# std::make_unique, std::make_unique_for_overwrite

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class... Args >
unique_ptr<T> make_unique( Args&&... args );
(ate C++23)
(apenas para tipos não-array)
template< class T, class... Args >
constexpr unique_ptr<T> make_unique( Args&&... args );
(apenas para tipos não-array)
template< class T >
unique_ptr<T> make_unique( std::size_t size );
(ate C++23)
(apenas para tipos array com limite desconhecido)
template< class T >
constexpr unique_ptr<T> make_unique( std::size_t size );
(apenas para tipos array com limite desconhecido)
template< class T, class... Args >
/* unspecified */ make_unique( Args&&... args ) = delete;
(apenas para tipos array com limite conhecido)
template< class T >
unique_ptr<T> make_unique_for_overwrite();
(ate C++23)
(apenas para tipos não-array)
template< class T >
constexpr unique_ptr<T> make_unique_for_overwrite();
(apenas para tipos não-array)
template< class T >
unique_ptr<T> make_unique_for_overwrite( std::size_t size );
(ate C++23)
(apenas para tipos array com limite desconhecido)
template< class T >
constexpr unique_ptr<T> make_unique_for_overwrite( std::size_t size );
(apenas para tipos array com limite desconhecido)
template< class T, class... Args >
/* unspecified */ make_unique_for_overwrite( Args&&... args ) = delete;
(apenas para tipos array com limite conhecido)
```

Constrói um objeto do tipo `T` e o envolve em um [std::unique_ptr](<#/doc/memory/unique_ptr>).

1) Constrói um tipo não-array `T`. Os argumentos args são passados para o construtor de `T`. Esta sobrecarga participa da resolução de sobrecarga apenas se `T` não for um tipo array. A função é equivalente a:
```
    unique_ptr<T>(new T(std::forward<Args>(args)...))
```

2) Constrói um array do tamanho dinâmico fornecido. Os elementos do array são [inicializados por valor](<#/doc/language/value_initialization>). Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um array de limite desconhecido. A função é equivalente a:
```
    unique_ptr<T>(new std::remove_extent_t<T>size)
```

3,6) A construção de arrays de limite conhecido é proibida.

4) O mesmo que (1), exceto que o objeto é [inicializado por padrão](<#/doc/language/default_initialization>). Esta sobrecarga participa da resolução de sobrecarga apenas se `T` não for um tipo array. A função é equivalente a:
```
    unique_ptr<T>(new T)
```

5) O mesmo que (2), exceto que o array é inicializado por padrão. Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um array de limite desconhecido. A função é equivalente a:
```
    unique_ptr<T>(new std::remove_extent_t<T>[size])
```

### Parâmetros

- **args** — lista de argumentos com os quais uma instância de `T` será construída
- **size** — o comprimento do array a ser construído

### Valor de retorno

[std::unique_ptr](<#/doc/memory/unique_ptr>) de uma instância do tipo `T`.

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou qualquer exceção lançada pelo construtor de `T`. Se uma exceção for lançada, esta função não tem efeito.

### Implementação Possível

[make_unique (1-3)](<#/doc/memory/unique_ptr/make_unique>)
---
```
    // C++14 make_unique
    namespace detail
    {
        template<class>
        constexpr bool is_unbounded_array_v = false;
        template<class T>
        constexpr bool is_unbounded_array_v<T[]> = true;
    
        template<class>
        constexpr bool is_bounded_array_v = false;
        template<class T, std::size_t N>
        constexpr bool is_bounded_array_v<T[N]> = true;
    } // namespace detail
    
    template<class T, class... Args>
    std::enable_if_t<!std::is_array<T>::value, std::unique_ptr<T>>
    make_unique(Args&&... args)
    {
        return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
    }
    
    template<class T>
    std::enable_if_t<detail::is_unbounded_array_v<T>, std::unique_ptr<T>>
    make_unique(std::size_t n)
    {
        return std::unique_ptr<T>(new std::remove_extent_t<T>n);
    }
    
    template<class T, class... Args>
    std::enable_if_t<detail::is_bounded_array_v<T>> make_unique(Args&&...) = delete;
```

[make_unique_for_overwrite (4-6)](<#/doc/memory/unique_ptr/make_unique>)
```
    // C++20 make_unique_for_overwrite
    template<class T>
        requires (!std::is_array_v<T>)
    std::unique_ptr<T> make_unique_for_overwrite()
    {
        return std::unique_ptr<T>(new T);
    }
    
    template<class T>
        requires std::is_unbounded_array_v<T>
    std::unique_ptr<T> make_unique_for_overwrite(std::size_t n)
    {
        return std::unique_ptr<T>(new std::remove_extent_t<T>[n]);
    }
    
    template<class T, class... Args>
        requires std::is_bounded_array_v<T>
    void make_unique_for_overwrite(Args&&...) = delete;
```

### Notas

Ao contrário de [std::make_shared](<#/doc/memory/shared_ptr/make_shared>) (que possui [std::allocate_shared](<#/doc/memory/shared_ptr/allocate_shared>)), `std::make_unique` não possui uma contraparte ciente de alocador. `allocate_unique` proposto em [P0211](<https://wg21.link/P0211>) seria necessário para inventar o tipo de deleter `D` para o [std::unique_ptr](<#/doc/memory/unique_ptr>)<T,D> que ele retorna, o qual conteria um objeto alocador e invocaria tanto `destroy` quanto `deallocate` em seu operator().

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_make_unique`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | `std::make_unique`; sobrecarga ([1](<#/doc/memory/unique_ptr/make_unique>))
[`__cpp_lib_smart_ptr_for_overwrite`](<#/doc/feature_test>) | [`202002L`](<#/>) | (C++20) | Criação de smart pointer com inicialização padrão ([std::allocate_shared_for_overwrite](<#/doc/memory/shared_ptr/allocate_shared>), [std::make_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>), `std::make_unique_for_overwrite`); sobrecargas ([4-6](<#/doc/memory/unique_ptr/make_unique>))
[`__cpp_lib_constexpr_memory`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `constexpr` para sobrecargas ([1,2,4,5](<#/doc/memory/unique_ptr/make_unique>))

### Exemplo

| Esta seção está incompleta
Razão: adicionar mais demonstrações de make_unique_for_overwrite()

Run this code
```
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <memory>
    #include <utility>
    
    struct Vec3
    {
        int x, y, z;
    
        // O construtor a seguir não é mais necessário desde C++20.
        Vec3(int x = 0, int y = 0, int z = 0) noexcept : x(x), y(y), z(z) {}
    
        friend std::ostream& operator<<(std::ostream& os, const Vec3& v)
        {
            return os << "{ x=" << v.x << ", y=" << v.y << ", z=" << v.z << " }";
        }
    };
    
    // Imprime números de Fibonacci para um iterador de saída.
    template<typename OutputIt>
    OutputIt fibonacci(OutputIt first, OutputIt last)
    {
        for (int a = 0, b = 1; first != last; ++first)
        {
            *first = b;
            b += std::exchange(a, b);
        }
        return first;
    }
    
    int main()
    {
        // Usa o construtor padrão.
        std::unique_ptr<Vec3> v1 = std::make_unique<Vec3>();
        // Usa o construtor que corresponde a estes argumentos.
        std::unique_ptr<Vec3> v2 = std::make_unique<Vec3>(0, 1, 2);
        // Cria um unique_ptr para um array de 5 elementos.
        std::unique_ptr<Vec3[]> v3 = std::make_unique<Vec3[]>(5);
    
        // Cria um unique_ptr para um array não inicializado de 10 inteiros,
        // então o preenche com números de Fibonacci.
        std::unique_ptr<int[]> i1 = std::make_unique_for_overwrite<int[]>(10);
        fibonacci(i1.get(), i1.get() + 10);
    
        std::cout << "make_unique<Vec3>():      " << *v1 << '\n'
                  << "make_unique<Vec3>(0,1,2): " << *v2 << '\n'
                  << "make_unique<Vec3[]>(5):   ";
        for (std::size_t i = 0; i < 5; ++i)
            std::cout << std::setw(i ? 30 : 0) << v3[i] << '\n';
        std::cout << '\n';
    
        std::cout << "make_unique_for_overwrite<int[]>(10), fibonacci(...): [" << i1[0];
        for (std::size_t i = 1; i < 10; ++i)
            std::cout << ", " << i1[i];
        std::cout << "]\n";
    }
```

Saída:
```
    make_unique<Vec3>():      { x=0, y=0, z=0 }
    make_unique<Vec3>(0,1,2): { x=0, y=1, z=2 }
    make_unique<Vec3[]>(5):   { x=0, y=0, z=0 }
                              { x=0, y=0, z=0 }
                              { x=0, y=0, z=0 }
                              { x=0, y=0, z=0 }
                              { x=0, y=0, z=0 }
    
    make_unique_for_overwrite<int[]>(10), fibonacci(...): [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

### Veja também

[ (constructor)](<#/doc/memory/unique_ptr/unique_ptr>) | constrói um novo `unique_ptr`
(função membro pública)
[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(modelo de função)