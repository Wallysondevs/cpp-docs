# Requisitos nomeados C++: FunctionObject

Um tipo **FunctionObject** é o tipo de um objeto que pode ser usado à esquerda do operador de chamada de função.

### Requisitos

O tipo `T` satisfaz FunctionObject se

* O tipo `T` satisfaz [std::is_object](<#/doc/types/is_object>), e

Dado

* `f`, um valor do tipo `T` ou `const T`,
* `args`, uma lista de argumentos adequada, que pode ser vazia.

As seguintes expressões devem ser válidas:

Expressão | Requisitos
---|---
f(args) | realiza uma chamada de função

### Notas

Funções e referências a funções não são tipos function object, mas podem ser usadas onde tipos function object são esperados devido à [conversão implícita](<#/doc/language/implicit_cast>) de função para ponteiro.

### Biblioteca padrão

* Todos os [ponteiros para funções](<#/doc/language/pointer>) satisfazem este requisito.
* Todos os function objects definidos em [\`<functional>\`](<#/doc/header/functional>).
* Alguns tipos de retorno de funções de [\`<functional>\`](<#/doc/header/functional>).

### Exemplo

Demonstra diferentes tipos de function objects.

Execute este código
```cpp
    #include <functional>
    #include <iostream>
     
    void foo(int x) { std::cout << "foo(" << x << ")\n"; }
    void bar(int x) { std::cout << "bar(" << x << ")\n"; }
     
    int main()
    {
        void(*fp)(int) = foo;
        fp(1); // calls foo using the pointer to function
     
        std::invoke(fp, 2); // all FunctionObject types are Callable
     
        auto fn = std::function<void(int)>(foo); // see also the rest of <functional>
        fn(3);
        fn.operator()(3); // the same effect as fn(3)
     
        struct S
        {
            void operator()(int x) const { std::cout << "S::operator(" << x << ")\n"; }
        } s;
        s(4); // calls s.operator()
        s.operator()(4); // the same as s(4)
     
        auto lam =  { std::cout << "lambda(" << x << ")\n"; };
        lam(5); // calls the lambda
        lam.operator()(5); // the same as lam(5)
     
        struct T
        {
            using FP = void (*)(int);
            operator FP() const { return bar; }
        } t;
        t(6); // t is converted to a function pointer
        static_cast<void (*)(int)>(t)(6); // the same as t(6)
        t.operator T::FP()(6); // the same as t(6) 
    }
```

Saída:
```
    foo(1)
    foo(2)
    foo(3)
    foo(3)
    S::operator(4)
    S::operator(4)
    lambda(5)
    lambda(5)
    bar(6)
    bar(6)
    bar(6)
```

### Veja também

[Callable](<#/doc/named_req/Callable>) | um tipo para o qual a operação invoke é definida
(requisito nomeado)
*[_(as is)_]: A::pointer