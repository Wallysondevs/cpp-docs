# std::mem_fun

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Res, class T >
std::mem_fun_t<Res,T> mem_fun( Res (T::*f)() );
(removido em C++17)
template< class Res, class T >
std::const_mem_fun_t<Res,T> mem_fun( Res (T::*f)() const );
(removido em C++17)
template< class Res, class T, class Arg >
std::mem_fun1_t<Res,T,Arg> mem_fun( Res (T::*f)(Arg) );
(removido em C++17)
template< class Res, class T, class Arg >
std::const_mem_fun1_t<Res,T,Arg> mem_fun( Res (T::*f)(Arg) const );
(removido em C++17)
```

Cria um objeto wrapper de função membro, deduzindo o tipo alvo a partir dos argumentos do template. O objeto wrapper espera um ponteiro para um objeto do tipo `T` como o primeiro parâmetro para seu operator().

1) Efetivamente chama [std::mem_fun_t](<#/doc/utility/functional/mem_fun_t>)<Res,T>(f) ou [std::const_mem_fun_t](<#/doc/utility/functional/mem_fun_t>)<Res,T>(f).

2) Efetivamente chama [std::mem_fun1_t](<#/doc/utility/functional/mem_fun_t>)<Res,T,Arg>(f) ou [std::const_mem_fun1_t](<#/doc/utility/functional/mem_fun_t>)<Res,T,Arg>(f).

Esta função e os tipos relacionados foram obsoletos desde C++11 e removidos em C++17 em favor dos mais gerais [std::mem_fn](<#/doc/utility/functional/mem_fn>) e [std::bind](<#/doc/utility/functional/bind>), ambos os quais criam objetos de função chamáveis e compatíveis com adaptadores a partir de funções membro.

### Parâmetros

- **f** — ponteiro para uma função membro para criar um wrapper

### Valor de retorno

Um objeto de função que encapsula f.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

A diferença entre std::mem_fun e [std::mem_fun_ref](<#/doc/utility/functional/mem_fun_ref>) é que o primeiro produz um wrapper de função que espera um ponteiro para um objeto, enquanto o último — uma referência.

### Exemplo

Demonstra o uso de `std::mem_fun` e o compara com [std::mem_fn](<#/doc/utility/functional/mem_fn>). O modo de compilação compatível com C++11/14 pode ser necessário: g++/clang++ com -std=c++11, cl com /std:c++11, etc. Em compiladores recentes, por exemplo, gcc-12, pode emitir avisos de "declaração obsoleta" se não for compilado no modo C++98.

Run this code
```cpp
    #include <functional>
    #include <iostream>
    
    struct S
    {
        int get_data() const { return data; }
        void no_args() const { std::cout << "void S::no_args() const\n"; }
        void one_arg(int) { std::cout << "void S::one_arg()\n"; }
        void two_args(int, int) { std::cout << "void S::two_args(int, int)\n"; }
    #if __cplusplus > 201100
        int data{42};
    #else
        int data;
        S() : data(42) {}
    #endif
    };
    
    int main()
    {
        S s;
    
        std::const_mem_fun_t<int, S> p = std::mem_fun(&S::get_data);
        std::cout << "s.get_data(): " << p(&s) << '\n';
    
        std::const_mem_fun_t<void, S> p0 = std::mem_fun(&S::no_args);
        p0(&s);
    
        std::mem_fun1_t<void, S, int> p1 = std::mem_fun(&S::one_arg);
        p1(&s, 1);
    
    #if __cplusplus > 201100
    //  auto p2 = std::mem_fun(&S::two_args); // Error: mem_fun supports only member functions
                                              // without parameters or with only one parameter.
                                              // Thus, std::mem_fn is a better alternative:
        auto p2 = std::mem_fn(&S::two_args);
        p2(s, 1, 2);
    
    //  auto pd = std::mem_fun(&S::data); // Error: pointers to data members are not supported.
                                          // Use std::mem_fn instead:
        auto pd = std::mem_fn(&S::data);
        std::cout << "s.data = " << pd(s) << '\n';
    #endif
    }
```

Saída possível:
```
    s.get_data(): 42
    void S::no_args() const
    void S::one_arg(int)
    void S::two_args(int, int)
    s.data = 42
```

### Veja também

[ mem_fn](<#/doc/utility/functional/mem_fn>)(desde C++11) | cria um objeto de função a partir de um ponteiro para um membro
(modelo de função)
[ mem_fun_ref](<#/doc/utility/functional/mem_fun_ref>)(obsoleto desde C++11)(removido em C++17) | cria um wrapper a partir de um ponteiro para função membro, chamável com uma referência a objeto
(modelo de função)