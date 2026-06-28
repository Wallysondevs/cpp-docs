# std::decay

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct decay;
```

  
Realiza as conversões de tipo equivalentes às realizadas ao passar [argumentos de função](<#/doc/language/function>) por valor. Formalmente: 

  * Se `T` for "array de `U`" ou uma referência a ele, o typedef membro `type` é `U*`. 

  * Caso contrário, se `T` for um tipo de função `F` ou uma referência a um, o typedef membro `type` é [std::add_pointer](<#/doc/types/add_pointer>)&lt;F&gt;::type. 

  * Caso contrário, o typedef membro `type` é [std::remove_cv](<#/doc/types/remove_cv>)<[std::remove_reference](<#/doc/types/remove_reference>)&lt;T&gt;::type>::type. 

Se o programa adicionar especializações para `std::decay`, o comportamento é indefinido. 

### Tipos de membros

Nome  |  Definição   
---|---
`type` |  o resultado da aplicação das conversões de tipo decay a `T`  
  
### Tipos auxiliares

```cpp
template< class T >
using decay_t = typename decay<T>::type;  // (desde C++14)
```

  
### Possível implementação
```cpp 
    template<class T>
    struct decay
    {
    private:
        typedef typename std::remove_reference<T>::type U;
    public:
        typedef typename std::conditional< 
            std::is_array<U>::value,
            typename std::add_pointer<typename std::remove_extent<U>::type>::type,
            typename std::conditional< 
                std::is_function<U>::value,
                typename std::add_pointer<U>::type,
                typename std::remove_cv<U>::type
            >::type
        >::type type;
    };
```  
  
---  
  
### Exemplo

Execute este código
```cpp 
    #include <type_traits>
     
    template<typename T, typename U>
    constexpr bool is_decay_equ = std::is_same_v<std::decay_t<T>, U>;
     
    int main()
    {
        static_assert
        (
            is_decay_equ<int, int> &&
            ! is_decay_equ<int, float> &&
            is_decay_equ<int&, int> &&
            is_decay_equ<int&&, int> &&
            is_decay_equ<const int&, int> &&
            is_decay_equ<int[2], int*> &&
            ! is_decay_equ<int[4][2], int*> &&
            ! is_decay_equ<int[4][2], int**> &&
            is_decay_equ<int[4][2], int(*)[2]> &&
            is_decay_equ<int(int), int(*)(int)>
        );
    }
```

### Veja também

[ remove_cvref](<#/doc/types/remove_cvref>)(C++20) | combina [std::remove_cv](<#/doc/types/remove_cv>) e [std::remove_reference](<#/doc/types/remove_reference>)   
(modelo de classe)  
[`implicit conversion`](<#/doc/language/implicit_cast>) | conversões de array para ponteiro, de função para ponteiro, de lvalue para rvalue 