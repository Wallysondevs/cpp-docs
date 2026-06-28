# std::forward

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T >
T&& forward( typename std::remove_reference<T>::type& t ) noexcept;
(até C++14)
template< class T >
constexpr T&& forward( std::remove_reference_t<T>& t ) noexcept;
template< class T >
T&& forward( typename std::remove_reference<T>::type&& t ) noexcept;
(até C++14)
template< class T >
constexpr T&& forward( std::remove_reference_t<T>&& t ) noexcept;
```

1) Encaminha lvalues como lvalues ou como rvalues, dependendo de T.

Quando t é uma [forwarding reference](<#/doc/language/reference>) (um argumento de função que é declarado como uma rvalue reference para um parâmetro de template de função cv-unqualified), esta sobrecarga encaminha o argumento para outra função com a [categoria de valor](<#/doc/language/value_category>) que ele tinha quando passado para a função chamadora.

Por exemplo, se usado em um wrapper como o seguinte, o template se comporta como descrito abaixo:
```cpp
    template<class T>
    void wrapper(T&& arg)
    {
        // arg is always lvalue
        foo(std::forward<T>(arg)); // Forward as lvalue or as rvalue, depending on T
    }
```

*   Se uma chamada para `wrapper()` passar um rvalue `std::string`, então `T` é deduzido para `std::string` (não `std::string&`, `const std::string&`, ou `std::string&&`), e `std::forward` garante que uma rvalue reference seja passada para `foo`.
*   Se uma chamada para `wrapper()` passar um const lvalue `std::string`, então `T` é deduzido para `const std::string&`, e `std::forward` garante que uma const lvalue reference seja passada para `foo`.
*   Se uma chamada para `wrapper()` passar um non-const lvalue `std::string`, então `T` é deduzido para `std::string&`, e `std::forward` garante que uma non-const lvalue reference seja passada para `foo`.

2) Encaminha rvalues como rvalues e proíbe o encaminhamento de rvalues como lvalues.

Esta sobrecarga torna possível encaminhar o resultado de uma expressão (como uma chamada de função), que pode ser rvalue ou lvalue, como a categoria de valor original de um argumento de forwarding reference.

Por exemplo, se um wrapper não apenas encaminha seu argumento, mas chama uma função membro no argumento e encaminha seu resultado:
```cpp
    // transforming wrapper
    template<class T>
    void wrapper(T&& arg)
    {
        foo(forward<decltype(forward<T>(arg).get())>(forward<T>(arg).get()));
    }
```

onde o tipo de arg pode ser
```cpp
    struct Arg
    {
        int i = 1;
        int  get() && { return i; } // call to this overload is rvalue
        int& get() &  { return i; } // call to this overload is lvalue
    };
```

Tentar encaminhar um rvalue como um lvalue, como ao instanciar a forma (2) com um tipo T de lvalue reference, é um erro em tempo de compilação.

### Notas

Veja [dedução de argumento de template](<#/doc/language/template_argument_deduction>) para as regras especiais por trás das forwarding references (`T&&` usado como parâmetro de função) e [forwarding references](<#/doc/language/reference>) para outros detalhes.

### Parâmetros

- **t** — o objeto a ser encaminhado

### Valor de retorno

static_cast<T&&>(t)

### Complexidade

Constante.

### Exemplo

Este exemplo demonstra o perfect forwarding do(s) parâmetro(s) para o argumento do construtor da classe `T`. Além disso, o perfect forwarding de parameter packs é demonstrado.

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <utility>
    
    struct A
    {
        A(int&& n) { std::cout << "rvalue overload, n=" << n << '\n'; }
        A(int& n)  { std::cout << "lvalue overload, n=" << n << '\n'; }
    };
    
    class B
    {
    public:
        template<class T1, class T2, class T3>
        B(T1&& t1, T2&& t2, T3&& t3) :
            a1_{std::forward<T1>(t1)},
            a2_{std::forward<T2>(t2)},
            a3_{std::forward<T3>(t3)}
        {}
    
    private:
        A a1_, a2_, a3_;
    };
    
    template<class T, class U>
    std::unique_ptr<T> make_unique1(U&& u)
    {
        return std::unique_ptr<T>(new T(std::forward<U>(u)));
    }
    
    template<class T, class... U>
    std::unique_ptr<T> make_unique2(U&&... u)
    {
        return std::unique_ptr<T>(new T(std::forward<U>(u)...));
    }
    
    auto make_B(auto&&... args) // desde C++20
    {
        return B(std::forward<decltype(args)>(args)...);
    }
    
    int main()
    {
        auto p1 = make_unique1<A>(2); // rvalue
        int i = 1;
        auto p2 = make_unique1<A>(i); // lvalue
    
        std::cout << "B\n";
        auto t = make_unique2<B>(2, i, 3);
    
        std::cout << "make_B\n";
        [[maybe_unused]] B b = make_B(4, i, 5);
    }
```

Saída:
```
    rvalue overload, n=2
    lvalue overload, n=1
    B
    rvalue overload, n=2
    lvalue overload, n=1
    rvalue overload, n=3
    make_B
    rvalue overload, n=4
    lvalue overload, n=1
    rvalue overload, n=5
```

### Veja também

[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(template de função)
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(C++11) | converte o argumento para um xvalue se o construtor de move não lançar exceção
(template de função)