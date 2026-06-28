# std::add_cv, std::add_const, std::add_volatile

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct add_cv;
template< class T >
struct add_const;
template< class T >
struct add_volatile;
```

Fornece o typedef de membro `type` que é o mesmo que `T`, exceto que possui um qualificador cv adicionado (a menos que `T` seja uma função, uma referência, ou já possua este qualificador cv)

1) adiciona const e volatile

2) adiciona const

3) adiciona volatile

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Tipos de membro

Nome | Definição
---|---
`type` | o tipo `T` com o qualificador cv

### Tipos auxiliares

```cpp
template< class T >
using add_cv_t = typename add_cv<T>::type;  // (desde C++14)
template< class T >
using add_const_t = typename add_const<T>::type;  // (desde C++14)
template< class T >
using add_volatile_t = typename add_volatile<T>::type;  // (desde C++14)
```

### Possível implementação
```cpp
    template<class T> struct add_cv { typedef const volatile T type; };
    
    template<class T> struct add_const { typedef const T type; };
    
    template<class T> struct add_volatile { typedef volatile T type; };
```

---

### Notas

Esses traits de transformação podem ser usados para estabelecer [contextos não deduzidos](<#/doc/language/template_argument_deduction>) na dedução de argumentos de template:
```cpp
    template<class T>
    void f(const T&, const T&);
    
    template<class T>
    void g(const T&, std::add_const_t<T>&);
    
    f(4.2, 0); // erro, tipos conflitantes deduzidos para 'T'
    g(4.2, 0); // OK, chama g<double>
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    struct foo
    {
        void m() { std::cout << "Non-cv\n"; }
        void m() const { std::cout << "Const\n"; }
        void m() volatile { std::cout << "Volatile\n"; }
        void m() const volatile { std::cout << "Const-volatile\n"; }
    };
    
    int main()
    {
        foo{}.m();
        std::add_const<foo>::type{}.m();
        std::add_volatile<foo>::type{}.m();
        std::add_cv<foo>::type{}.m();
    }
```

Saída:
```
    Non-cv
    Const
    Volatile
    Const-volatile
```

### Veja também

[ is_const](<#/doc/types/is_const>)(C++11) | verifica se um tipo é qualificado como const
(class template)
[ is_volatile](<#/doc/types/is_volatile>)(C++11) | verifica se um tipo é qualificado como volatile
(class template)
[ remove_cvremove_constremove_volatile](<#/doc/types/remove_cv>)(C++11)(C++11)(C++11) | remove os especificadores const e/ou volatile do tipo fornecido
(class template)
[ as_const](<#/doc/utility/as_const>)(C++17) | obtém uma referência a const para seu argumento
(function template)