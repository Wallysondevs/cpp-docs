# std::function

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class >
class function; /* undefined */
template< class R, class... Args >
class function<R(Args...)>;
```

O modelo de classe `std::function` é um invólucro de função polimórfico de propósito geral. Instâncias de `std::function` podem armazenar, copiar e invocar qualquer _target_ [CopyConstructible](<#/doc/named_req/CopyConstructible>) [Callable](<#/doc/named_req/Callable>) -- funções (via ponteiros para elas), [expressões lambda](<#/doc/language/lambda>), [expressões bind](<#/doc/utility/functional/bind>), ou outros objetos de função, bem como ponteiros para funções membro e ponteiros para membros de dados.

O objeto invocável armazenado é chamado de _target_ de `std::function`. Se uma `std::function` não contém um target, ela é chamada de _vazia_. Invocar o _target_ de uma `std::function` _vazia_ resulta no lançamento de uma exceção [std::bad_function_call](<#/doc/utility/functional/bad_function_call>).

`std::function` satisfaz os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Tipos membro

Tipo | Definição
---|---
`result_type` | `R`
`argument_type`
(obsoleto em C++17)(removido em C++20) | `T` se sizeof...(Args)==1 e `T` é o primeiro e único tipo em `Args...`
`first_argument_type`
(obsoleto em C++17)(removido em C++20) | `T1` se sizeof...(Args)==2 e `T1` é o primeiro dos dois tipos em `Args...`
`second_argument_type`
(obsoleto em C++17)(removido em C++20) | `T2` se sizeof...(Args)==2 e `T2` é o segundo dos dois tipos em `Args...`

### Funções membro

[ (construtor)](<#/doc/utility/functional/function/function>) | constrói uma nova instância de `std::function`
(função membro pública)
[ (destrutor)](<#/doc/utility/functional/function/~function>) | destrói uma instância de `std::function`
(função membro pública)
[ operator=](<#/>) | atribui um novo target
(função membro pública)
[ swap](<#/doc/utility/functional/function/swap>) | troca os conteúdos
(função membro pública)
[ assign](<#/doc/utility/functional/function/assign>)(removido em C++17) | atribui um novo target
(função membro pública)
[ operator bool](<#/doc/utility/functional/function/operator_bool>) | verifica se um target está contido
(função membro pública)
[ operator()](<#/>) | invoca o target
(função membro pública)

##### Acesso ao Target

[ target_type](<#/doc/utility/functional/function/target_type>) | obtém o typeid do target armazenado
(função membro pública)
[ target](<#/doc/utility/functional/function/target>) | obtém um ponteiro para o target armazenado
(função membro pública)

### Funções não-membro

[ std::swap(std::function)](<#/doc/utility/functional/function/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ operator==operator!=](<#/doc/utility/functional/function/operator_cmp>)(removido em C++20) | compara uma **std::function** com nullptr
(modelo de função)

### Classes auxiliares

[ std::uses_allocator<std::function>](<#/doc/utility/functional/function/uses_allocator>)(C++11) (até C++17) | especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)

### [Deduction guides](<#/doc/utility/functional/function/deduction_guides>)(desde C++17)

### Notas

```cpp
Deve-se ter cuidado quando uma `std::function`, cujo tipo de resultado é uma referência, é inicializada a partir de uma expressão lambda sem um trailing-return-type. Devido à forma como a dedução `auto` funciona, tal expressão lambda sempre retornará um prvalue. Portanto, a referência resultante geralmente se ligará a um temporário cuja vida útil termina quando `std::function::operator()` retorna.  // (até C++23)
Se uma `std::function` que retorna uma referência é inicializada a partir de uma função ou objeto de função que retorna um prvalue (incluindo uma expressão lambda sem um trailing-return-type), o programa é malformado porque a ligação da referência retornada a um objeto temporário é proibida.  // (desde C++23)
```
```cpp
    std::function<const int&()> F([] { return 42; }); // Error since C++23: can't bind
                                                      // the returned reference to a temporary
    int x = F(); // Undefined behavior until C++23: the result of F() is a dangling reference
    
    std::function<int&()> G( -> int& { static int i{0x2A}; return i; }); // OK
    
    std::function<const int&()> H([i{052}] -> const int& { return i; }); // OK
```

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    
    struct Foo
    {
        Foo(int num) : num_(num) {}
        void print_add(int i) const { std::cout << num_ + i << '\n'; }
        int num_;
    };
    
    void print_num(int i)
    {
        std::cout << i << '\n';
    }
    
    struct PrintNum
    {
        void operator()(int i) const
        {
            std::cout << i << '\n';
        }
    };
    
    int main()
    {
        // store a free function
        std::function<void(int)> f_display = print_num;
        f_display(-9);
    
        // store a lambda
        std::function<void()> f_display_42 =  { print_num(42); };
        f_display_42();
    
        // store the result of a call to std::bind
        std::function<void()> f_display_31337 = std::bind(print_num, 31337);
        f_display_31337();
    
        // store a call to a member function
        std::function<void(const Foo&, int)> f_add_display = &Foo::print_add;
        const Foo foo(314159);
        f_add_display(foo, 1);
        f_add_display(314159, 1);
    
        // store a call to a data member accessor
        std::function<int(Foo const&)> f_num = &Foo::num_;
        std::cout << "num_: " << f_num(foo) << '\n';
    
        // store a call to a member function and object
        using std::placeholders::_1;
        std::function<void(int)> f_add_display2 = std::bind(&Foo::print_add, foo, _1);
        f_add_display2(2);
    
        // store a call to a member function and object ptr
        std::function<void(int)> f_add_display3 = std::bind(&Foo::print_add, &foo, _1);
        f_add_display3(3);
    
        // store a call to a function object
        std::function<void(int)> f_display_obj = PrintNum();
        f_display_obj(18);
    
        auto factorial = 
        {
            // store a lambda object to emulate "recursive lambda"; aware of extra overhead
            std::function<int(int)> fac = & { return (n < 2) ? 1 : n * fac(n - 1); };
            // note that "auto fac = & {...};" does not work in recursive calls
            return fac(n);
        };
        for (int i{5}; i != 8; ++i)
            std::cout << i << "! = " << factorial(i) << ";  ";
        std::cout << '\n';
    }
```

Saída possível:
```
    -9
    42
    31337
    314160
    314160
    num_: 314159
    314161
    314162
    18
    5! = 120;  6! = 720;  7! = 5040;
```

### Veja também

[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | invólucro move-only de qualquer objeto invocável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ copyable_function](<#/doc/utility/functional/copyable_function>)(C++26) | invólucro copiável de qualquer objeto invocável copiável que suporte qualificadores em uma dada assinatura de chamada
(modelo de classe)
[ function_ref](<#/doc/utility/functional/function_ref>)(C++26) | invólucro não-proprietário de qualquer objeto invocável
(modelo de classe)
[ bad_function_call](<#/doc/utility/functional/bad_function_call>)(C++11) | a exceção lançada ao invocar uma **std::function** vazia
(classe)
[ mem_fn](<#/doc/utility/functional/mem_fn>)(C++11) | cria um objeto de função a partir de um ponteiro para um membro
(modelo de função)
[`typeid`](<#/doc/language/typeid>) | consulta informações de um tipo, retornando um objeto [std::type_info](<#/doc/types/type_info>) que representa o tipo