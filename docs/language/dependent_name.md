# Nomes dependentes

Dentro da definição de um [template](<#/doc/language/templates>) (tanto [class template](<#/doc/language/class_template>) quanto [function template](<#/doc/language/function_template>)), o significado de algumas construções pode diferir de uma instanciação para outra. Em particular, tipos e expressões podem depender de tipos de parâmetros de template de tipo e valores de parâmetros de template não-tipo.
```cpp
    template<typename T>
    struct X : B<T> // “B<T>” is dependent on T
    {
        typename T::A* pa; // “T::A” is dependent on T
                           // (see below for the meaning of this use of “typename”)
    
        void f(B<T>* pb)
        {
            static int i = B<T>::i; // “B<T>::i” is dependent on T
            pb->j++; // “pb->j” is dependent on T
        }
    };
```

A [busca](<#/doc/language/lookup>) e a ligação de nomes são diferentes para nomes dependentes e nomes não-dependentes.

### Regras de ligação

Nomes não-dependentes são buscados e ligados no ponto de definição do template. Essa ligação se mantém mesmo que no ponto de instanciação do template haja uma correspondência melhor:

Run this code
```cpp
    #include <iostream>
    
    void g(double) { std::cout << "g(double)\n"; }
    
    template<class T>
    struct S
    {
        void f() const
        {
            g(1); // “g” is a non-dependent name, bound now
        }
    };
    
    void g(int) { std::cout << "g(int)\n"; }
    
    int main()
    {
        g(1);  // calls g(int)
    
        S<int> s;
        s.f(); // calls g(double)
    }
```

Se o significado de um nome não-dependente mudar entre o contexto de definição e o ponto de instanciação de uma especialização do template, o programa é malformado, sem diagnóstico obrigatório. Isso é possível nas seguintes situações:

  * um tipo usado em um nome não-dependente é [incompleto](<#/doc/language/incomplete_type>) no ponto de definição, mas completo no ponto de instanciação

  * a busca por um nome na definição do template encontrou uma [using-declaration](<#/doc/language/using_declaration>), mas a busca no escopo correspondente na instanciação não encontra nenhuma declaração porque a using-declaration era uma expansão de pack e o pack correspondente está vazio

| (desde C++17)
  * uma instanciação usa um argumento padrão ou argumento de template padrão que não havia sido definido no ponto de definição
  * uma [expressão constante](<#/doc/language/constant_expression>) no ponto de instanciação usa o valor de um objeto const de tipo integral ou enum não-escopado, o valor de um objeto constexpr, o valor de uma referência, ou a definição de uma função constexpr (desde C++11), e esse objeto/referência/função (desde C++11) não foi definido no ponto de definição
  * o template usa uma especialização de class template não-dependente ou especialização de variable template (desde C++14) no ponto de instanciação, e este template que ele usa é instanciado a partir de uma especialização parcial que não foi definida no ponto de definição ou nomeia uma especialização explícita que não foi declarada no ponto de definição

A ligação de nomes dependentes é adiada até que a busca ocorra.

### Regras de busca

A [busca](<#/doc/language/lookup>) de um nome dependente usado em um template é adiada até que os argumentos do template sejam conhecidos, momento em que

  * a busca não-ADL examina declarações de função com linkage externo que são visíveis a partir do contexto de definição do template
  * [ADL](<#/doc/language/adl>) examina declarações de função com linkage externo que são visíveis tanto do contexto de definição do template quanto do contexto de instanciação do template

(em outras palavras, adicionar uma nova declaração de função após a definição do template não a torna visível, exceto via ADL).

O propósito desta regra é ajudar a proteger contra violações da [ODR](<#/doc/language/definition>) para instanciações de template:
```cpp
    // an external library
    namespace E
    {
        template<typename T>
        void writeObject(const T& t)
        {
            std::cout << "Value = " << t << '\n';
        }
    }
    
    // translation unit 1:
    // Programmer 1 wants to allow E::writeObject to work with vector<int>
    namespace P1
    {
        std::ostream& operator<<(std::ostream& os, const std::vector<int>& v)
        {
            for (int n : v)
                os << n << ' ';
            return os;
        }
    
        void doSomething()
        {
            std::vector<int> v;
            E::writeObject(v); // Error: will not find P1::operator<<
        }
    }
    
    // translation unit 2:
    // Programmer 2 wants to allow E::writeObject to work with vector<int>
    namespace P2
    {
        std::ostream& operator<<(std::ostream& os, const std::vector<int>& v)
        {
            for (int n : v)
                os << n << ':';
            return os << "[]";
        }
    
        void doSomethingElse()
        {
            std::vector<int> v;
            E::writeObject(v); // Error: will not find P2::operator<<
        }
    }
```

No exemplo acima, se a busca não-ADL por `operator<<` fosse permitida a partir do contexto de instanciação, a instanciação de E::writeObject<vector&lt;int&gt;> teria duas definições diferentes: uma usando P1::operator<< e outra usando P2::operator<<. Tal violação da ODR pode não ser detectada pelo linker, levando a que uma ou outra seja usada em ambas as instâncias.

Para fazer com que a ADL examine um namespace definido pelo usuário, [std::vector](<#/doc/container/vector>) deve ser substituído por uma classe definida pelo usuário ou seu tipo de elemento deve ser uma classe definida pelo usuário:
```cpp
    namespace P1
    {
        // if C is a class defined in the P1 namespace
        std::ostream& operator<<(std::ostream& os, const std::vector<C>& v)
        {
            for (C n : v)
                os << n;
            return os;
        }
    
        void doSomething()
        {
            std::vector<C> v;
            E::writeObject(v); // OK: instantiates writeObject(std::vector<P1::C>)
                               //     which finds P1::operator<< via ADL
        }
    }
```

Nota: esta regra torna impraticável sobrecarregar operadores para tipos da standard library:

Run this code
```cpp
    #include <iostream>
    #include <iterator>
    #include <utility>
    #include <vector>
    
    // Bad idea: operator in global namespace, but its arguments are in std::
    std::ostream& operator<<(std::ostream& os, std::pair<int, double> p)
    {
        return os << p.first << ',' << p.second;
    }
    
    int main()
    {
        typedef std::pair<int, double> elem_t;
        std::vector<elem_t> v(10);
        std::cout << v[0] << '\n'; // OK, ordinary lookup finds ::operator<<
        std::copy(v.begin(), v.end(),
                  std::ostream_iterator<elem_t>(std::cout, " "));
        // Error: both ordinary lookup from the point of definition of
        // std::ostream_iterator and ADL will only consider the std namespace,
        // and will find many overloads of std::operator<<, so the lookup will be done.
        // Overload resolution will then fail to find operator<< for elem_t
        // in the set found by the lookup.
    }
```

Nota: a busca limitada (mas não a ligação) de nomes dependentes também ocorre no tempo de definição do template, conforme necessário para distingui-los de nomes não-dependentes e também para determinar se são membros da instanciação atual ou membros de especialização desconhecida. As informações obtidas por esta busca podem ser usadas para detectar erros, veja abaixo.

### Tipos dependentes

Os seguintes tipos são _tipos dependentes_ ﻿:

  * parâmetro de template
  * um membro de uma especialização desconhecida (veja abaixo)
  * uma classe/enum aninhada que é um membro dependente de especialização desconhecida (veja abaixo)
  * uma versão cv-qualificada de um tipo dependente
  * um tipo composto construído a partir de um tipo dependente
  * um tipo array cujo tipo de elemento é dependente ou cujo limite (se houver) é value-dependent

  * um tipo de função cujos parâmetros incluem um ou mais [parameter packs](<#/doc/language/parameter_pack>) de função

| (desde C++11)
  * um tipo de função cuja especificação de exceção é value-dependent
  * um [template-id](<#/doc/language/templates>) onde ou

    

  * o nome do template é um parâmetro de template, ou
  * qualquer um dos argumentos do template é type-dependent, ou value-dependent, ou é uma expansão de pack (desde C++11) (mesmo que o template-id seja usado sem sua lista de argumentos, como [injected-class-name](<#/doc/language/injected-class-name>))

  * o resultado de [`decltype`](<#/doc/language/decltype>) aplicado a uma expressão type-dependent

```cpp
O resultado de decltype aplicado a uma expressão type-dependent é um tipo dependente único. Dois desses resultados referem-se ao mesmo tipo apenas se suas expressões forem equivalentes.  // (desde C++11)
```
  * o [pack indexing specifier](<#/doc/language/pack_indexing>) aplicado a uma expressão constante type-dependent

O pack indexing specifier aplicado a uma expressão constante type-dependent é um tipo dependente único. Dois desses pack indexing specifiers referem-se ao mesmo tipo apenas se suas expressões constantes forem equivalentes. Caso contrário, dois desses pack indexing specifiers referem-se ao mesmo tipo apenas se seus índices tiverem o mesmo valor. | (desde C++26)

Nota: um membro typedef de uma instanciação atual é dependente apenas quando o tipo ao qual ele se refere é.

### Expressões type-dependentes

As seguintes expressões são _type-dependentes_ ﻿:

  * uma expressão cuja qualquer subexpressão é uma expressão type-dependent
  * this, se a classe for um tipo dependente.
  * uma [expressão identificador](<#/doc/language/name>) que não é um [concept-id](<#/doc/language/constraints>) e (desde C++20)

    

  * contém um identificador para o qual a busca de nome encontra pelo menos uma declaração dependente
  * contém um [template-id](<#/doc/language/templates>) dependente

    

  * contém o identificador especial `__func__` (se alguma função envolvente for um template, um membro não-template de um class template, ou uma lambda genérica (desde C++14))

| (desde C++11)
    

  * contém o nome de [função de conversão](<#/doc/language/cast_operator>) para um tipo dependente
  * contém um especificador de nome aninhado ou [qualified-id](<#/doc/language/name>) que é um membro de especialização desconhecida
  * nomeia um membro dependente da instanciação atual que é um static data member do tipo "array de limite desconhecido"

    

  * contém um identificador para o qual a busca de nome encontra uma ou mais declarações de funções membro da instanciação atual declaradas com [dedução de tipo de retorno](<#/doc/language/function>)

| (desde C++14)
    

  * contém um identificador para o qual a busca de nome encontra uma [declaração de structured binding](<#/doc/language/structured_binding>) cujo inicializador é type-dependent
  * contém um identificador para o qual a busca de nome encontra um parâmetro de template não-tipo cujo tipo contém o placeholder auto
  * contém um identificador para o qual a busca de nome encontra uma variável declarada com um tipo que contém um tipo placeholder (por exemplo, static data member auto), onde o inicializador é type-dependent,

| (desde C++17)
  
    

  * contém um identificador para o qual a busca de nome encontra um [pack](<#/doc/language/parameter_pack>)

| (desde C++26)
  
  * qualquer expressão de cast para um tipo dependente
  * [new expression](<#/doc/language/new>) que cria um objeto de um tipo dependente
  * expressão de acesso a membro que se refere a um membro da instanciação atual cujo tipo é dependente
  * expressão de acesso a membro que se refere a um membro de especialização desconhecida

  * [fold expression](<#/doc/language/fold>)

| (desde C++17)
  * [pack indexing expression](<#/doc/language/pack_indexing>) se sua expressão identificador for uma expressão type-dependent

| (desde C++26)

As seguintes expressões nunca são type-dependentes porque os tipos dessas expressões não podem ser:

  * [literais](<#/doc/language/expressions>)
  * chamadas de pseudo-destrutor
  * [`sizeof`](<#/doc/language/sizeof>)

  * [`sizeof...`](<#/doc/language/sizeof...>)
  * [`alignof`](<#/doc/language/alignof>)
  * [`noexcept`](<#/doc/language/noexcept>)

| (desde C++11)
  * [`throw`](<#/doc/language/throw>)
  * [`typeid`](<#/doc/language/typeid>)
  * [`delete`](<#/doc/language/delete>)

  * [`requires`](<#/doc/language/requires>)

| (desde C++20)

### Expressões value-dependentes

As seguintes expressões são _value-dependentes_ ﻿:

  * uma expressão usada em um contexto onde uma [expressão constante](<#/doc/language/constant_expression>) é necessária, e cuja qualquer subexpressão é value-dependent
  * uma [expressão identificador](<#/doc/language/name>) que satisfaz qualquer uma das seguintes condições:

    

  * É um [concept-id](<#/doc/language/constraints>) e qualquer um de seus argumentos é dependente.

| (desde C++20)
    

  * É type-dependent.
  * É um nome de um parâmetro de template não-tipo.
  * Nomeia um static data member que é um membro dependente da instanciação atual e não é inicializado.
  * Nomeia uma static member function que é um membro dependente da instanciação atual.
  * É uma constante com um tipo inteiro ou enumeração (até C++11) literal (desde C++11), inicializada a partir de uma expressão value-dependent.

  * as seguintes expressões onde o operando é uma expressão type-dependent:

    

  * [`sizeof`](<#/doc/language/sizeof>)
  * [`typeid`](<#/doc/language/typeid>)

    

  * [`alignof`](<#/doc/language/alignof>)

| (desde C++11)
  * as seguintes expressões onde o operando é um type-id dependente:

    

  * [`sizeof`](<#/doc/language/sizeof>)
  * [`typeid`](<#/doc/language/typeid>)

  * as seguintes expressões onde o tipo alvo é dependente ou o operando é uma expressão type-dependent:

    

  * [C-style cast](<#/doc/language/explicit_cast>)
  * [`static_cast`](<#/doc/language/static_cast>)
  * [`const_cast`](<#/doc/language/const_cast>)
  * [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)
  * [`dynamic_cast`](<#/doc/language/dynamic_cast>)

  * [expressão de function-style cast](<#/doc/language/explicit_cast>) onde o tipo alvo é dependente ou uma expressão value-dependent é envolvida por parênteses ou chaves (desde C++11)

  * expressão `sizeof...` onde o operando não é um [structured binding pack](<#/doc/language/structured_binding>) (desde C++26)

| (desde C++11)
  * [fold expression](<#/doc/language/fold>)

| (desde C++17)
  
  * expressão address-of onde o argumento é um [identificador qualificado](<#/doc/language/name>) que nomeia um membro dependente da instanciação atual
  * expressão address-of onde o argumento é qualquer expressão que, avaliada como uma [expressão constante](<#/doc/language/constant_expression>) central, se refere a uma [entidade template](<#/doc/language/templates>) que é um objeto com duração de armazenamento estático ou de thread (desde C++11) ou uma função membro.

### Nomes dependentes

| Esta seção está incompleta
Razão: a introdução de [temp.dep], que está faltando (expressão identificador seguida por lista entre parênteses...
| Esta seção está incompleta
Razão: reformular para talvez tornar mais claro (ou pelo menos menos intimidante), e enquanto isso, aplicar [CWG issue 591](<https://cplusplus.github.io/CWG/issues/591.html>)

### Instanciação atual

Dentro de uma definição de class template (incluindo suas funções membro e classes aninhadas), alguns nomes podem ser deduzidos para se referir à _instanciação atual_. Isso permite que certos erros sejam detectados no ponto de definição, em vez de instanciação, e remove a exigência dos disambiguadores typename e template para nomes dependentes, veja abaixo.

Apenas os seguintes nomes podem se referir à instanciação atual:

  * na definição de um class template, uma classe aninhada de um class template, um membro de um class template, ou um membro de uma classe aninhada de um class template:
    * o injected-class-name do class template ou classe aninhada
  * na definição de um primary class template ou um membro de um primary class template:
    * o nome do class template seguido pela lista de argumentos do template (ou uma especialização de alias template equivalente) para o template primário onde cada argumento é equivalente (definido abaixo) ao seu parâmetro correspondente.
  * na definição de uma classe aninhada de um class template:
    * o nome da classe aninhada usada como membro da instanciação atual
  * na definição de uma especialização parcial de class template ou um membro de uma especialização parcial de class template:
    * o nome do class template seguido pela lista de argumentos do template para a especialização parcial, onde cada argumento é equivalente ao seu parâmetro correspondente
  * na definição de uma [função template](<#/doc/language/templates>):
    * o nome de uma [classe local](<#/doc/language/class>)

Um argumento de template é equivalente a um parâmetro de template se

  * para um [parâmetro de tipo](<#/doc/language/template_parameters>), o argumento de template denota o mesmo tipo que o parâmetro de template.
  * para um [parâmetro não-tipo](<#/doc/language/template_parameters>), o argumento de template é um [identificador](<#/doc/language/name>) que nomeia uma variável que é equivalente ao parâmetro de template. Uma variável é equivalente a um parâmetro de template se

    

  * ela tem o mesmo tipo que o parâmetro de template (ignorando cv-qualification) e
  * seu inicializador consiste em um único identificador que nomeia o parâmetro de template ou, recursivamente, tal variável.

```cpp
    template<class T>
    class A
    {
        A* p1;      // A is the current instantiation
        A<T>* p2;   // A<T> is the current instantiation
        ::A<T>* p4; // ::A<T> is the current instantiation
        A<T*> p3;   // A<T*> is not the current instantiation
    
        class B
        {
            B* p1;                 // B is the current instantiation
            A<T>::B* p2;           // A<T>::B is the current instantiation
            typename A<T*>::B* p3; // A<T*>::B is not the current instantiation
        };
    };
    
    template<class T>
    class A<T*>
    {
        A<T*>* p1; // A<T*> is the current instantiation
        A<T>* p2;  // A<T> is not the current instantiation
    };
    
    template<int I>
    struct B
    {
        static const int my_I = I;
        static const int my_I2 = I + 0;
        static const int my_I3 = my_I;
        static const long my_I4 = I;
        static const int my_I5 = (I);
    
        B<my_I>* b1;  // B<my_I> is the current instantiation:
                      //   my_I has the same type as I,
                      //   and it is initialized with only I
        B<my_I2>* b2; // B<my_I2> is not the current instantiation:
                      //   I + 0 is not a single identifier
        B<my_I3>* b3; // B<my_I3> is the current instantiation:
                      //   my_I3 has the same type as I,
                      //   and it is initialized with only my_I (which is equivalent to I)
        B<my_I4>* b4; // B<my_I4> is not the current instantiation:
                      //   the type of my_I4 (long) is not the same as the type of I (int)
        B<my_I5>* b5; // B<my_I5> is not the current instantiation:
                      //   (I) is not a single identifier
    };
```

Note que uma classe base pode ser a instanciação atual se uma classe aninhada deriva de seu class template envolvente. Classes base que são tipos dependentes, mas não são a instanciação atual, são _dependent base classes_ :
```cpp
    template<class T>
    struct A
    {
        typedef int M;
    
        struct B
        {
            typedef void M;
    
            struct C;
        };
    };
    
    template<class T>
    struct A<T>::B::C : A<T>
    {
        M m; // OK, A<T>::M
    };
```

Um nome é classificado como membro da instanciação atual se for

  * um nome não qualificado que é encontrado por [unqualified lookup](<#/doc/language/unqualified_lookup>) na instanciação atual ou em sua base não-dependente.
  * [nome qualificado](<#/doc/language/qualified_lookup>), se o qualificador (o nome à esquerda de `::`) nomeia a instanciação atual e a busca encontra o nome na instanciação atual ou em sua base não-dependente
  * um nome usado em uma expressão de acesso a membro de classe (y em x.y ou xp->y), onde a expressão objeto (x ou *xp) é a instanciação atual e a busca encontra o nome na instanciação atual ou em sua base não-dependente

```cpp
    template<class T>
    class A
    {
        static const int i = 5;
    
        int n1[i];       // i refers to a member of the current instantiation
        int n2[A::i];    // A::i refers to a member of the current instantiation
        int n3[A<T>::i]; // A<T>::i refers to a member of the current instantiation
    
        int f();
    };
    
    template<class T>
    int A<T>::f()
    {
        return i; // i refers to a member of the current instantiation
    }
```

Membros da instanciação atual podem ser tanto dependentes quanto não-dependentes.

Se a busca de um membro da instanciação atual der um resultado diferente entre o ponto de instanciação e o ponto de definição, a busca é ambígua. Note, no entanto, que quando um nome de membro é usado, ele não é automaticamente convertido em uma expressão de acesso a membro de classe; apenas expressões de acesso a membro explícitas indicam membros da instanciação atual:
```cpp
    struct A { int m; };
    struct B { int m; };
    
    template<typename T>
    struct C : A, T
    {
        int f() { return this->m; } // finds A::m in the template definition context
        int g() { return m; }       // finds A::m in the template definition context
    };
    
    template int C<B>::f(); // error: finds both A::m and B::m
    
    template int C<B>::g(); // OK: transformation to class member access syntax
                            // does not occur in the template definition context
```

### Especializações desconhecidas

Dentro de uma definição de template, certos nomes são deduzidos como pertencentes a uma _especialização desconhecida_ , em particular,

  * um [nome qualificado](<#/doc/language/qualified_lookup>), se qualquer nome que aparece à esquerda de `::` for um tipo dependente que não é membro da instanciação atual
  * um [nome qualificado](<#/doc/language/qualified_lookup>), cujo qualificador é a instanciação atual, e o nome não é encontrado na instanciação atual ou em qualquer uma de suas classes base não-dependentes, e há uma classe base dependente
  * um nome de um membro em uma expressão de acesso a membro de classe (o y em x.y ou xp->y), se o tipo da expressão objeto (x ou *xp) for um tipo dependente e não for a instanciação atual
  * um nome de um membro em uma expressão de acesso a membro de classe (o y em x.y ou xp->y), se o tipo da expressão objeto (x ou *xp) for a instanciação atual, e o nome não for encontrado na instanciação atual ou em qualquer uma de suas classes base não-dependentes, e houver uma classe base dependente

```cpp
    template<typename T>
    struct Base {};
    
    template<typename T>
    struct Derived : Base<T>
    {
        void f()
        {
            // Derived<T> refers to current instantiation
            // there is no “unknown_type” in the current instantiation
            // but there is a dependent base (Base<T>)
            // Therefore, “unknown_type” is a member of unknown specialization
            typename Derived<T>::unknown_type z;
        }
    };
    
    template<>
    struct Base<int> // this specialization provides it
    {
        typedef int unknown_type;
    };
```

Esta classificação permite que os seguintes erros sejam detectados no ponto de definição do template (em vez de instanciação):

  * Se qualquer definição de template tiver um [nome qualificado](<#/doc/language/qualified_lookup>) no qual o qualificador se refere à instanciação atual e o nome não é nem um membro da instanciação atual nem um membro de especialização desconhecida, o programa é malformado (sem diagnóstico obrigatório) mesmo que o template nunca seja instanciado.

```cpp
    template<class T>
    class A
    {
        typedef int type;
    
        void f()
        {
            A<T>::type i; // OK: “type” is a member of the current instantiation
            typename A<T>::other j; // Error:
    
            // “other” is not a member of the current instantiation
            // and it is not a member of an unknown specialization
            // because A<T> (which names the current instantiation),
            // has no dependent bases for “other” to hide in.
        }
    };
```

  * Se qualquer definição de template tiver uma expressão de acesso a membro onde a expressão objeto é a instanciação atual, mas o nome não é nem um membro da instanciação atual nem um membro de especialização desconhecida, o programa é malformado mesmo que o template nunca seja instanciado.

Membros de especialização desconhecida são sempre dependentes e são buscados e ligados no ponto de instanciação como todos os nomes dependentes (veja acima)

### O disambiguador typename para nomes dependentes

Em uma declaração ou definição de um template, incluindo alias template, um nome que não é membro da instanciação atual e é dependente de um parâmetro de template não é considerado um tipo a menos que a palavra-chave typename seja usada ou a menos que já tenha sido estabelecido como um nome de tipo, por exemplo, com uma declaração typedef ou sendo usado para nomear uma classe base.

Run this code
```cpp
    #include <iostream>
    #include <vector>
    
    int p = 1;
    
    template<typename T>
    void foo(const std::vector<T> &v)
    {
        // std::vector<T>::const_iterator is a dependent name,
        typename std::vector<T>::const_iterator it = v.begin();
    
        // without “typename”, the following is parsed as multiplication
        // of the type-dependent data member “const_iterator”
        // and some variable “p”. Since there is a global “p” visible
        // at this point, this template definition compiles.
        std::vector<T>::const_iterator* p;
    
        typedef typename std::vector<T>::const_iterator iter_t;
        iter_t * p2; // “iter_t” is a dependent name, but it is known to be a type name
    }
    
    template<typename T>
    struct S
    {
        typedef int value_t; // member of current instantiation
    
        void f()
        {
            S<T>::value_t n{}; // S<T> is dependent, but “typename” not needed
            std::cout << n << '\n';
        }
    };
    
    int main()
    {
        std::vector<int> v;
        foo(v); // template instantiation fails: there is no member variable
                // called “const_iterator” in the type std::vector<int>
        S<int>().f();
    }
```

A palavra-chave typename só pode ser usada desta forma antes de nomes qualificados (por exemplo, T::x), mas os nomes não precisam ser dependentes.

A [busca de nome qualificado](<#/doc/language/qualified_lookup>) usual é usada para o identificador prefixado por typename. Ao contrário do caso com [elaborated type specifier](<#/doc/language/elaborated_type_specifier>), as regras de busca não mudam apesar do qualificador:
```cpp
    struct A // A has a nested variable X and a nested type struct X
    {
        struct X {};
        int X;
    };
    
    struct B
    {
        struct X {}; // B has a nested type struct X
    };
    
    template<class T>
    void f(T t)
    {
        typename T::X x;
    }
    
    void foo()
    {
        A a;
        B b;
        f(b); // OK: instantiates f<B>, T::X refers to B::X
        f(a); // error: cannot instantiate f<A>:
              // because qualified name lookup for A::X finds the data member
    }
```

A palavra-chave typename pode ser usada mesmo fora de templates.
```cpp
    #include <vector>
    
    int main()
    {
        // Both OK (after resolving CWG 382)
        typedef typename std::vector<int>::const_iterator iter_t;
        typename std::vector<int> v;
    }
```

Em alguns contextos, apenas nomes de tipo podem aparecer validamente. Nesses contextos, um nome qualificado dependente é assumido como nomeando um tipo e nenhum typename é necessário:

  * Um nome qualificado que é usado como um [especificador de declaração](<#/doc/language/declarations>) na decl-specifier-seq (de nível superior) de:

    

  * uma [declaração simples](<#/doc/language/declarations>) ou [definição de função](<#/doc/language/function>) no escopo de namespace;
  * uma [declaração de membro de classe](<#/doc/language/class>);
  * uma [declaração de parâmetro](<#/doc/language/function>) em uma [declaração de membro de classe](<#/doc/language/class>) (incluindo declarações de friend function), fora dos argumentos padrão;
  * uma [declaração de parâmetro](<#/doc/language/function>) de um [declarator para uma função ou function template](<#/doc/language/function>) cujo nome é qualificado, fora dos argumentos padrão;
  * uma [declaração de parâmetro](<#/doc/language/function>) de uma [lambda expression](<#/doc/language/lambda>) fora dos argumentos padrão;
  * uma declaração de parâmetro de uma [requires expression](<#/doc/language/constraints>);
  * o tipo na declaração de um [parâmetro de template não-tipo](<#/doc/language/template_parameters>);

  * Um nome qualificado que aparece em [type-id](<#/doc/language/type-id>), onde o type-id mais interno é:
  * o tipo em uma [expressão new](<#/doc/language/new>) que não parentiza seu tipo;
  * o type-id em uma [declaração de alias](<#/doc/language/type_alias>);
  * um [tipo de retorno final](<#/doc/language/function>),
  * um [argumento padrão de um parâmetro de template de tipo](<#/doc/language/template_parameters>), ou
  * o type-id de um [`static_cast`](<#/doc/language/static_cast>), [`dynamic_cast`](<#/doc/language/dynamic_cast>), [`const_cast`](<#/doc/language/const_cast>), ou [`reinterpret_cast`](<#/doc/language/reinterpret_cast>).

| (desde C++20)

### O disambiguador template para nomes dependentes

Similarmente, em uma definição de template, um nome dependente que não é um membro da instanciação atual não é considerado um nome de template a menos que a palavra-chave de desambiguação template seja usada ou a menos que já tenha sido estabelecido como um nome de template:

Run this code
```
    template<typename T>
    struct S
    {
        template<typename U>
        void foo() {}
    };
    
    template<typename T>
    void bar()
    {
        S<T> s;
        s.foo<T>();          // error: < parsed as less than operator
        s.template foo<T>(); // OK
    }
```

A palavra-chave template só pode ser usada desta forma após os operadores :: (resolução de escopo), -> (acesso a membro através de ponteiro) e . (acesso a membro), os seguintes são todos exemplos válidos:

  * T::template foo&lt;X&gt;();
  * s.template foo&lt;X&gt;();
  * this->template foo&lt;X&gt;();
  * typename T::template iterator&lt;int&gt;::value_type v;

Assim como no caso de typename, o prefixo template é permitido mesmo que o nome não seja dependente ou o uso não apareça no escopo de um template.

Mesmo que o nome à esquerda de `::` se refira a um namespace, o disambiguador template é permitido:
```
    template<typename>
    struct S {};
    
    ::template S<void> q; // allowed, but unnecessary
```

Devido às regras especiais para [lookup de nome não qualificado](<#/doc/language/unqualified_lookup>) para nomes de template em expressões de acesso a membro, quando um nome de template não dependente aparece em uma expressão de acesso a membro (após -> ou após .), o disambiguador é desnecessário se houver um template de classe ou alias (desde C++11) com o mesmo nome encontrado por lookup ordinário no contexto da expressão. No entanto, se o template encontrado por lookup no contexto da expressão diferir daquele encontrado no contexto da classe, o programa é malformado (até C++11).
```
    template<int>
    struct A { int value; };
    
    template<class T>
    void f(T t)
    {
        t.A<0>::value; // Ordinary lookup of A finds a class template.
                       // A<0>::value names member of class A<0>
        // t.A < 0;    // Error: “<” is treated as the start of template argument list
    }
```

| (até C++23)

### Palavras-chave

[`template`](<#/doc/keyword/template>), [`typename`](<#/doc/keywords/typename>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 206](<https://cplusplus.github.io/CWG/issues/206.html>) | C++98 | era não especificado em que ponto as restrições semânticas são aplicadas quando um tipo usado em um nome não dependente está incompleto no ponto em que um template é definido, mas está completo no ponto em que uma instanciação é realizada | o programa é malformado e nenhum diagnóstico é exigido neste caso
[CWG 224](<https://cplusplus.github.io/CWG/issues/224.html>) | C++98 | a definição de tipos dependentes era baseada na forma do nome em vez de lookup | definição reformulada
[CWG 382](<https://cplusplus.github.io/CWG/issues/382.html>) | C++98 | o disambiguador typename era permitido apenas no escopo do template | também permitido fora de templates
[CWG 468](<https://cplusplus.github.io/CWG/issues/468.html>) | C++98 | o disambiguador template era permitido apenas no escopo do template | também permitido fora de templates
[CWG 502](<https://cplusplus.github.io/CWG/issues/502.html>) | C++98 | era não especificado se enumerações aninhadas são dependentes | dependentes como classes aninhadas
[CWG 1047](<https://cplusplus.github.io/CWG/issues/1047.html>) | C++98 | expressões typeid nunca eram value-dependent | value-dependent se o operando for type-dependent
[CWG 1160](<https://cplusplus.github.io/CWG/issues/1160.html>) | C++98 | era não especificado se um nome se refere à instanciação atual quando um template-id que corresponde a um template primário ou especialização parcial aparece na definição de um membro do template | especificado
[CWG 1413](<https://cplusplus.github.io/CWG/issues/1413.html>) | C++98 | membro de dados estático não inicializado, função membro estática e endereço de membro de um template de classe não eram listados como value-dependent | listado
[CWG 1471](<https://cplusplus.github.io/CWG/issues/1471.html>) | C++98 | um tipo aninhado de uma base não dependente da instanciação atual era dependente | não é dependente
[CWG 1850](<https://cplusplus.github.io/CWG/issues/1850.html>) | C++98 | a lista de casos em que o significado pode mudar entre o contexto de definição e o ponto de instanciação estava incompleta | tornada completa
[CWG 1929](<https://cplusplus.github.io/CWG/issues/1929.html>) | C++98 | não estava claro se o disambiguador template pode seguir um `::` onde o nome à sua esquerda se refere a um namespace | permitido
[CWG 2066](<https://cplusplus.github.io/CWG/issues/2066.html>) | C++98 | this nunca era value-dependent | pode ser value-dependent
[CWG 2100](<https://cplusplus.github.io/CWG/issues/2100.html>) | C++98 | endereço de um membro de dados estático de template de classe não era listado como value-dependent | listado
[CWG 2109](<https://cplusplus.github.io/CWG/issues/2109.html>) | C++98 | expressões de identificador type-dependent podem não ser value-dependent | elas são sempre value-dependent
[CWG 2276](<https://cplusplus.github.io/CWG/issues/2276.html>) | C++98 | um tipo de função cuja especificação de exceção é value-dependent não era um tipo dependente | é
[CWG 2307](<https://cplusplus.github.io/CWG/issues/2307.html>) | C++98 | um parâmetro de template não-tipo entre parênteses usado como um argumento de template era equivalente a esse parâmetro de template | não é mais equivalente
[CWG 2457](<https://cplusplus.github.io/CWG/issues/2457.html>) | C++11 | um tipo de função com um function parameter pack não era um tipo dependente | é
[CWG 2785](<https://cplusplus.github.io/CWG/issues/2785.html>) | C++20 | expressões requires podem ser type-dependent | elas nunca são type-dependent
[CWG 2905](<https://cplusplus.github.io/CWG/issues/2905.html>) | C++11 | uma expressão noexcept era value-dependent apenas se seu operando fosse value-dependent | é value-dependent se seu operando envolve um parâmetro de template
[CWG 2936](<https://cplusplus.github.io/CWG/issues/2936.html>) | C++98 | os nomes de classes locais de funções com template não faziam parte da instanciação atual | fazem