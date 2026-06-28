# std::experimental::to_array

Definido no cabeçalho `[<experimental/array>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/array&action=edit&redlink=1> "cpp/header/experimental/array \(page does not exist\)")`

```c
template< class T, std::size_t N >
constexpr std::array<std::remove_cv_t<T>, N> to_array(T (&a)[N]);
```

  
Cria um [std::array](<#/doc/container/array>) a partir do array embutido a. Os elementos do [std::array](<#/doc/container/array>) são inicializados por cópia a partir do elemento correspondente de a. 

### Parâmetros

a  |  \-  |  o array embutido a ser usado para inicializar o [std::array](<#/doc/container/array>)  
  
### Valor de retorno

Um objeto [std::array](<#/doc/container/array>) cujos elementos são inicializados por cópia a partir do elemento correspondente de a. 

### Possível implementação
```cpp
    namespace detail
    {
        template<class T, std::size_t N, std::size_t... I>
        constexpr std::array<std::remove_cv_t<T>, N>
            to_array_impl(T (&a)[N], std::index_sequence<I...>)
        {
            return { {a[I]...} };
        }
    }
    
    template<class T, std::size_t N>
    constexpr std::array<std::remove_cv_t<T>, N> to_array(T (&a)[N])
    {
        return detail::to_array_impl(a, std::make_index_sequence<N>{});
    }
```
  
---  
  
### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstdlib>
    #include <experimental/array>
    #include <unistd.h>
    
    // mkstemp(3) that works
    template<std::size_t N>
    int tempfd(char const (&tmpl)[N])
    {
        auto s = std::experimental::to_array(tmpl);
        int fd = mkstemp(s.data());
        if (fd != -1)
            unlink(s.data());
    
        return fd;
    }
    
    int main()
    {
        int fd = tempfd("/tmp/test.XXXXXX");
        int rt = close(fd);
        assert(rt == 0);
    }
```

### Veja também

[ make_array](<#/doc/experimental/make_array>)(library fundamentals TS v2) | cria um objeto [std::array](<#/doc/container/array>) cujo tamanho e, opcionalmente, tipo de elemento são deduzidos dos argumentos   
(modelo de função)  