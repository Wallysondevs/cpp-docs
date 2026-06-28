# Templates de Membro

Declarações de template ([classe](<#/doc/language/class_template>), [função](<#/doc/language/function_template>) e [variáveis](<#/doc/language/variable_template>)(desde C++14)) podem aparecer dentro de uma [especificação de membro](<#/doc/language/class>) de qualquer classe, struct ou union que não sejam [classes locais](<#/doc/language/class>).

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    #include <vector>
    
    struct Printer
    {
        // generic functor
        std::ostream& os;
        Printer(std::ostream& os) : os(os) {}
        template<typename T>
        void operator()(const T& obj) { os << obj << ' '; } // member template
    };
    
    int main()
    {
        std::vector<int> v{1,2,3};
        std::for_each(v.begin(), v.end(), Printer(std::cout));
        std::string s{"abc"};
        std::ranges::for_each(s, Printer(std::cout));
    }
```

Saída:
```
    1 2 3 a b c
```

Especializações parciais de template de membro podem aparecer tanto no escopo da classe quanto no escopo do namespace envolvente. Especializações explícitas podem aparecer em qualquer escopo em que o template primário possa aparecer.
```cpp
    struct A
    {
        template<class T> struct B;        // primary member template
        template<class T> struct B<T*> {}; // OK: partial specialization
    //  template<> struct B<int*> {};      // OK via CWG 727: full specialization
    };
    template<> struct A::B<int*> {};       // OK
    template<class T> struct A::B<T&> {};  // OK
```

Se a declaração da classe envolvente for, por sua vez, um template de classe, quando um template de membro é definido fora do corpo da classe, ele recebe dois conjuntos de parâmetros de template: um para a classe envolvente e outro para si mesmo:
```cpp
    template<typename T1>
    struct string
    {
        // member template function
        template<typename T2>
        int compare(const T2&);
        // constructors can be templates too
        template<typename T2>
        string(const std::basic_string<T2>& s) { /*...*/ }
    };
    // out of class definition of string<T1>::compare<T2> 
    template<typename T1> // para o template de classe envolvente
    template<typename T2> // para o template de membro
    int string<T1>::compare(const T2& s) { /* ... */ }
```

### Templates de função membro

[Destrutores](<#/doc/language/destructor>) e [construtores de cópia](<#/doc/language/copy_constructor>) não podem ser templates. Se um construtor template for declarado e puder ser instanciado com a assinatura de tipo de um construtor de cópia, o [construtor de cópia implicitamente declarado](<#/doc/language/copy_constructor>) é usado em vez disso.

Um template de função membro não pode ser virtual, e um template de função membro em uma classe derivada não pode sobrescrever uma função membro virtual da classe base.
```cpp
    class Base
    {
        virtual void f(int);
    };
    
    struct Derived : Base
    {
        // este template de membro não sobrescreve Base::f
        template<class T> void f(T);
    
        // a sobrescrita de membro não-template pode chamar o template:
        void f(int i) override
        {
             f<>(i);
        }
    };
```

Uma função membro não-template e uma função membro template com o mesmo nome podem ser declaradas. Em caso de conflito (quando alguma especialização de template corresponde exatamente à assinatura da função não-template), o uso desse nome e tipo se refere ao membro não-template, a menos que uma lista explícita de argumentos de template seja fornecida.
```cpp
    template<typename T>
    struct A
    {
        void f(int); // membro não-template
    
        template<typename T2>
        void f(T2); // template de membro
    };
    
    // definição de membro template
    template<typename T>
    template<typename T2>
    void A<T>::f(T2)
    {
        // algum código
    }
    
    int main()
    {
        A<char> ac;
        ac.f('c'); // chama a função template A<char>::f<char>(char)
        ac.f(1);   // chama a função não-template A<char>::f(int)
        ac.f<>(1); // chama a função template A<char>::f<int>(int)
    }
```

Uma definição fora da classe de um template de função membro deve ser _equivalente_ à declaração dentro da classe (veja [sobrecarga de template de função](<#/doc/language/function_template>) para a definição de equivalência), caso contrário, é considerada uma sobrecarga.
```cpp
    struct X
    {
        template<class T> T good(T n);
        template<class T> T bad(T n);
    };
    
    template<class T> struct identity { using type = T; };
    
    // OK: declaração equivalente
    template<class V>
    V X::good(V n) { return n; }
    
    // Erro: não equivalente a nenhuma das declarações dentro de X
    template<class T>
    T X::bad(typename identity<T>::type n) { return n; }
```

### Templates de função de conversão

Uma [função de conversão](<#/doc/language/cast_operator>) definida pelo usuário pode ser um template.
```cpp
    struct A
    {
        template<typename T>
        operator T*(); // conversão para ponteiro para qualquer tipo
    };
    
    // definição fora da classe
    template<typename T>
    A::operator T*() { return nullptr; }
    
    // especialização explícita para char*
    template<>
    A::operator char*() { return nullptr; }
    
    // instanciação explícita
    template A::operator void*();
    
    int main()
    {
        A a;
        int* ip = a.operator int*(); // chamada explícita para A::operator int*()
    }
```

Durante a [resolução de sobrecarga](<#/doc/language/overload_resolution>), especializações de templates de função de conversão não são encontradas por [busca de nome](<#/doc/language/lookup>). Em vez disso, todos os templates de função de conversão visíveis são considerados, e cada especialização produzida por [dedução de argumento de template](<#/doc/language/template_argument_deduction>) (que possui regras especiais para templates de função de conversão) é usada como se fosse encontrada por busca de nome.

Declarações `using` em classes derivadas não podem se referir a especializações de funções de conversão template de classes base.

Um template de função de conversão definido pelo usuário não pode ter um tipo de retorno deduzido:
```cpp
    struct S
    {
        operator auto() const { return 10; } // OK
        template<class T> operator auto() const { return 42; } // erro
    };
```

| (desde C++14) |
|---|

### Templates de variável membro

Uma declaração de template de variável pode aparecer no escopo da classe, caso em que declara um template de membro de dados estático. Veja [templates de variável](<#/doc/language/variable_template>) para detalhes. | (desde C++14)
|---|

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1878](<https://cplusplus.github.io/CWG/issues/1878.html>) | C++14 | operator auto era tecnicamente permitido | operator auto proibido