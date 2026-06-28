# A regra dos três/cinco/zero

### Regra dos três  
  
Se uma classe requer um [destrutor](<#/doc/language/destructor>) definido pelo usuário, um [construtor de cópia](<#/doc/language/copy_constructor>) definido pelo usuário, ou um [operador de atribuição de cópia](<#/doc/language/as_operator>) definido pelo usuário, ela quase certamente requer todos os três.

Como C++ copia e atribui por cópia objetos de tipos definidos pelo usuário em várias situações (passagem/retorno por valor, manipulação de um container, etc.), essas funções membro especiais serão chamadas, se acessíveis, e se não forem definidas pelo usuário, elas são implicitamente definidas pelo compilador.

As funções membro especiais implicitamente definidas não devem ser usadas se a classe gerencia um recurso cujo handle não destrói o próprio recurso (ponteiro bruto, descritor de arquivo POSIX, etc.), cujo destrutor não faz nada e o construtor de cópia/operador de atribuição de cópia apenas copia o valor do handle, sem duplicar o recurso subjacente.

Execute este código
```
    #include <cstddef>
    #include <cstring>
    #include <iostream>
    #include <utility>
     
    class rule_of_three
    {
        char* cstring; // raw pointer used as a handle to a
                       // dynamically-allocated memory block
     
    public:
        rule_of_three(const char* s, std::size_t n)
            : cstring(new char[n + 1]) // allocate
        {
            std::memcpy(cstring, s, n); // populate
            cstring[n] = '\0';          // tail 0
        }
     
        explicit rule_of_three(const char* s = "")
            : rule_of_three(s, std::strlen(s))
        {
        }
     
        ~rule_of_three() // I. destructor
        {
            delete[] cstring; // deallocate
        }
     
        rule_of_three(const rule_of_three& other) // II. copy constructor
            : rule_of_three(other.cstring)
        {
        }
     
        rule_of_three& operator=(const rule_of_three& other) // III. copy assignment
        {
            if (this == &other)
                return *this;
     
            rule_of_three temp(other); // use the copy constructor
            std::swap(cstring, temp.cstring); // exchange the underlying resource
     
            return *this;
        }
     
        const char* c_str() const // accessor
        {
            return cstring;
        }
    };
     
    int main()
    {
        rule_of_three o1{"abc"};
        std::cout << o1.c_str() << ' ';
        auto o2{o1}; // II. uses copy constructor
        std::cout << o2.c_str() << ' ';
        rule_of_three o3{"def"};
        std::cout << o3.c_str() << ' ';
        o3 = o2; // III. uses copy assignment
        std::cout << o3.c_str() << '\n';
    }   // I. all destructors are called here
```

Saída: 
```
    abc abc def abc
```

Classes que gerenciam recursos não copiáveis através de handles copiáveis podem ter que declarar o operador de atribuição de cópia e o construtor de cópia como privados e não fornecer suas definições (até C++11) ou definir o operador de atribuição de cópia e o construtor de cópia como `= delete` (desde C++11). Esta é outra aplicação da regra dos três: deletar um e deixar o outro ser implicitamente definido é tipicamente incorreto.

### Regra dos cinco

Porque a presença de um destrutor, construtor de cópia ou operador de atribuição de cópia definido pelo usuário (incluindo `= default` ou `= delete` declarados) impede a definição implícita do [construtor de movimento](<#/doc/language/move_constructor>) e do [operador de atribuição de movimento](<#/doc/language/move_operator>), qualquer classe para a qual a *move semantics* é desejável, deve declarar todas as cinco funções membro especiais: 
```
    #include <cstddef>
    #include <cstring>
    #include <utility>
     
    class rule_of_five
    {
        char* cstring; // raw pointer used as a handle to a
                       // dynamically-allocated memory block
     
    public:
        rule_of_five(const char* s, std::size_t n)
            : cstring(new char[n + 1]) // allocate
        {
            std::memcpy(cstring, s, n); // populate
            cstring[n] = '\0';          // tail 0
        }
     
        explicit rule_of_five(const char* s)
            : rule_of_five(s, std::strlen(s))
        {
        }
     
        ~rule_of_five() // I. destructor
        {
            delete[] cstring; // deallocate
        }
     
        rule_of_five(const rule_of_five& other) // II. copy constructor
            : rule_of_five(other.cstring)
        {
        }
     
        rule_of_five& operator=(const rule_of_five& other) // III. copy assignment
        {
            if (this == &other)
                return *this;
     
            rule_of_five temp(other); // use the copy constructor
            std::swap(cstring, temp.cstring); // exchange the underlying resource
     
            return *this;
        }
     
        rule_of_five(rule_of_five&& other) noexcept // IV. move constructor
            : cstring(std::exchange(other.cstring, nullptr))
        {
        }
     
        rule_of_five& operator=(rule_of_five&& other) noexcept // V. move assignment
        {
            rule_of_five temp(std::move(other));
            std::swap(cstring, temp.cstring);
            return *this;
        }
    };
```

Ao contrário da Regra dos Três, a falha em fornecer o construtor de movimento e a atribuição de movimento geralmente não é um erro, mas resultará em perda de desempenho.

### Regra do zero

Classes que possuem destrutores, construtores de cópia/movimento ou operadores de atribuição de cópia/movimento personalizados devem lidar exclusivamente com a propriedade (o que decorre do [Princípio da Responsabilidade Única](<https://en.wikipedia.org/wiki/Single_responsibility_principle> "enwiki:Single responsibility principle")). Outras classes não devem ter destrutores, construtores de cópia/movimento ou operadores de atribuição de cópia/movimento personalizados[1](<#/doc/language/rule_of_three>).

Esta regra também aparece nas C++ Core Guidelines como [C.20: Se você puder evitar definir operações padrão, faça-o](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rc-zero>). 
```
    class rule_of_zero
    {
        std::string cppstring;
    public:
        // redundant, implicitly defined is better
        // rule_of_zero(const std::string& arg) : cppstring(arg) {}
    };
```

Quando uma classe base é destinada ao uso polimórfico, seu destrutor pode ter que ser declarado público e virtual. Isso bloqueia movimentos implícitos (e deprecia cópias implícitas), e assim as funções membro especiais devem ser definidas como `= default`[2](<#/doc/language/rule_of_three>). 
```
    class base_of_five_defaults
    {
    public:
        base_of_five_defaults(const base_of_five_defaults&) = default;
        base_of_five_defaults(base_of_five_defaults&&) = default;
        base_of_five_defaults& operator=(const base_of_five_defaults&) = default;
        base_of_five_defaults& operator=(base_of_five_defaults&&) = default;
        virtual ~base_of_five_defaults() = default;
    };
```

No entanto, isso torna a classe propensa a *slicing*, razão pela qual classes polimórficas frequentemente definem a cópia como `= delete` (veja [C.67: Uma classe polimórfica deve suprimir cópia/movimento público](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c67-a-polymorphic-class-should-suppress-public-copymove>) nas C++ Core Guidelines), o que leva à seguinte formulação genérica para a Regra dos Cinco: 

    [C.21: Se você definir ou =delete qualquer função de cópia, movimento ou destrutor, defina ou =delete todas elas.](<https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#c21-if-you-define-or-delete-any-copy-move-or-destructor-function-define-or-delete-them-all>)

### Links externos

  1. [↑](<#/doc/language/rule_of_three>) ["Rule of Zero", R. Martinho Fernandes 08/15/2012](<https://web.archive.org/web/20130211035910/http://flamingdangerzone.com/cxx11/2012/08/15/rule-of-zero.html>)
  2. [↑](<#/doc/language/rule_of_three>) ["A Concern about the Rule of Zero", Scott Meyers, 3/13/2014](<https://scottmeyers.blogspot.fr/2014/03/a-concern-about-rule-of-zero.html>).

  
---