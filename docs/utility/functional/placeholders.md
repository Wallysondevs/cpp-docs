# std::placeholders::_1, std::placeholders::_2, ..., std::placeholders::_N

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
/*see below*/ _1;
/*see below*/ _2;
.
.
/*see below*/ _N;
```

O namespace **std::placeholders** contém os objetos placeholder `[_1, ..., _N]` onde `N` é um número máximo definido pela implementação.

Quando usados como um argumento em uma expressão [std::bind](<#/doc/utility/functional/bind>), os objetos placeholder são armazenados no objeto de função gerado, e quando esse objeto de função é invocado com argumentos não vinculados, cada placeholder `_N` é substituído pelo N-ésimo argumento não vinculado correspondente.

```cpp
Cada placeholder é declarado como se fosse por extern /*unspecified*/ _1;. | (ate C++17)
As implementações são encorajadas a declarar os placeholders como se fossem por inline constexpr /*unspecified*/ _1;, embora declará-los por extern /*unspecified*/ _1; ainda seja permitido pelo padrão.  // (desde C++17)
```

Os tipos dos objetos placeholder são [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>), seus construtores de cópia/movimentação padrão não lançam exceções, e para qualquer placeholder `_N`, o tipo [std::is_placeholder](<#/doc/utility/functional/is_placeholder>)<decltype(_N)> é definido, onde [std::is_placeholder](<#/doc/utility/functional/is_placeholder>)<decltype(_N)> é derivado de [std::integral_constant](<#/doc/types/integral_constant>)<int, N>.

### Exemplo

O código a seguir mostra a criação de objetos de função com argumentos placeholder.

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <string>
    
    void goodbye(const std::string& s)
    {
        std::cout << "Goodbye " << s << '\n';
    }
    
    class Object
    {
    public:
        void hello(const std::string& s)
        {
            std::cout << "Hello " << s << '\n';
        }
    };
    
    int main()
    {
        using namespace std::placeholders;
    
        using ExampleFunction = std::function<void(const std::string&)>;
        Object instance;
        std::string str("World");
    
        ExampleFunction f = std::bind(&Object::hello, &instance, _1);
        f(str); // equivalent to instance.hello(str)
    
        f = std::bind(&goodbye, std::placeholders::_1);
        f(str); // equivalent to goodbye(str)
    
        auto lambda =  pre, char o, int rep, std::string post)
        {
            std::cout << pre;
            while (rep-- > 0)
                std::cout << o;
            std::cout << post << '\n';
        };
    
        // binding the lambda:
        std::function<void(std::string, char, int, std::string)> g =
            std::bind(&decltype(lambda)::operator(), &lambda, _1, _2, _3, _4);
        g("G", 'o', 'o'-'g', "gol");
    }
```

Saída:
```
    Hello World
    Goodbye World
    Goooooooogol
```

### Veja também

[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(modelo de função)
[ is_placeholder](<#/doc/utility/functional/is_placeholder>)(C++11) | indica que um objeto é um placeholder padrão ou pode ser usado como tal
(modelo de classe)
[ ignore](<#/doc/utility/tuple/ignore>)(C++11) | placeholder para pular um elemento ao desempacotar uma `tuple` usando [`tie`](<#/doc/utility/tuple/tie>)
(constante)