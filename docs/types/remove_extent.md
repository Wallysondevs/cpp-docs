# std::remove_extent

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct remove_extent;
```

  
Se `T` for um array de algum tipo `X`, fornece o typedef membro `type` igual a `X`, caso contrário `type` é `T`. Note que se `T` for um array multidimensional, apenas a primeira dimensão é removida. 

Se o programa adicionar especializações para `std::remove_extent`, o comportamento é indefinido. 

### Tipos membro

Nome  |  Definição   
---|---
`type` |  o tipo do elemento de `T`  
  
### Tipos auxiliares

```cpp
template< class T >
using remove_extent_t = typename remove_extent<T>::type;  // (desde C++14)
```

  
### Possível implementação
```cpp
    template<class T>
    struct remove_extent { using type = T; };
    
    template<class T>
    struct remove_extent<T[]> { using type = T; };
    
    template<class T, std::size_t N>
    struct remove_extent<T[N]> { using type = T; };
```  
  
---  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <type_traits>
    
    template<class A>
        std::enable_if_t<std::rank_v<A> == 1>
    print_1d(const A& a)
    {
        std::copy(a, a + std::extent_v<A>,
            std::ostream_iterator<std::remove_extent_t<A>>(std::cout, " "));
        std::cout << '\n';
    }
    
    int main()
    {
        int a[][3] = {{1, 2, 3}, {4, 5, 6}};
    //  print_1d(a); // compile-time error
        print_1d(a[1]);
    }
```

Saída: 
```
    4 5 6
```

### Veja também

[ is_array](<#/doc/types/is_array>)(C++11) |  verifica se um tipo é um tipo de array   
(modelo de classe)  
[ rank](<#/doc/types/rank>)(C++11) |  obtém o número de dimensões de um tipo de array   
(modelo de classe)  
[ extent](<#/doc/types/extent>)(C++11) |  obtém o tamanho de um tipo de array ao longo de uma dimensão especificada   
(modelo de classe)  
[ remove_all_extents](<#/doc/types/remove_all_extents>)(C++11) |  remove todas as extensões do tipo de array fornecido   
(modelo de classe)