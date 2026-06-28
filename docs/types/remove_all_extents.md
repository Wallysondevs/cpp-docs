# std::remove_all_extents

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct remove_all_extents;
```

Se `T` é um array multidimensional de algum tipo `X`, fornece o member typedef `type` igual a `X`, caso contrário `type` é `T`.

Se o programa adicionar especializações para `std::remove_all_extents`, o comportamento é indefinido.

### Tipos de membro

Nome | Definição
---|---
`type` | o tipo do elemento de `T`

### Tipos auxiliares

```cpp
template< class T >
using remove_all_extents_t = typename remove_all_all_extents<T>::type;  // (desde C++14)
```

### Possível implementação
```cpp
    template<class T>
    struct remove_all_extents { typedef T type; };
    
    template<class T>
    struct remove_all_extents<T[]> {
        typedef typename remove_all_extents<T>::type type;
    };
    
    template<class T, std::size_t N>
    struct remove_all_extents<T[N]> {
        typedef typename remove_all_extents<T>::type type;
    };
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    #include <typeinfo>
    
    template<class A>
    void info(const A&)
    {
        typedef typename std::remove_all_extents<A>::type Type;
        std::cout << "underlying type: " << typeid(Type).name() << '\n';
    }
    
    int main()
    {
        float a0;
        float a1[1][2][3];
        float a2[1][1][1][1][2];
        float* a3;
        int a4[3][2];
        double a5[2][3];
        struct X { int m; } x0[3][3];
    
        info(a0);
        info(a1);
        info(a2);
        info(a3);
        info(a4);
        info(a5);
        info(x0);
    }
```

Saída possível:
```
    underlying type: float
    underlying type: float
    underlying type: float
    underlying type: float*
    underlying type: int
    underlying type: double
    underlying type: main::X
```

### Veja também

[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo de array
(modelo de classe)
[ rank](<#/doc/types/rank>)(C++11) | obtém o número de dimensões de um tipo de array
(modelo de classe)
[ extent](<#/doc/types/extent>)(C++11) | obtém o tamanho de um tipo de array ao longo de uma dimensão especificada
(modelo de classe)
[ remove_extent](<#/doc/types/remove_extent>)(C++11) | remove uma extensão do tipo de array fornecido
(modelo de classe)