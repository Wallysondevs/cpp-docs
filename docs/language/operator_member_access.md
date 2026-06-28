# Operadores de acesso a membros

Acessa um membro de seu operando.

Nome do operador | Sintaxe | [Sobrecaregável](<#/doc/language/operators>) | Exemplos de protótipo (para a classe T)
---|---|---|---|---
Dentro da definição da classe | Fora da definição da classe
subscript | a[b] | Sim | R& T::operator[](S b); | N/A
a[...] (desde C++23) | R& T::operator[](...);
indirection | *a | Sim | R& T::operator*(); | R& operator*(T a);
address-of | &a | Sim | R* T::operator&(); | R* operator&(T a);
member of object | a.b | Não | N/A | N/A
member of pointer | a->b | Sim | R* T::operator->(); | N/A
pointer to member of object | a.*b | Não | N/A | N/A
pointer to member of pointer | a->*b | Sim | R& T::operator->*(S b); | R& operator->*(T a, S b);

**Notas**

*   Assim como na maioria das sobrecargas definidas pelo usuário, os tipos de retorno devem corresponder aos tipos de retorno fornecidos pelos operadores embutidos para que [os operadores definidos pelo usuário](<#/doc/language/operators>) possam ser usados da mesma maneira que os embutidos. No entanto, em uma sobrecarga de operador definida pelo usuário, qualquer tipo pode ser usado como tipo de retorno (incluindo void). Uma exceção é o operator->, que deve retornar um ponteiro ou outra classe com operator-> sobrecarregado para ser realisticamente utilizável.

### Explicação

O operador _subscrito_ embutido fornece acesso a um objeto apontado pelo operando [ponteiro](<#/doc/language/pointer>) ou [array](<#/doc/language/array>).

O operador de _indireção_ embutido fornece acesso a um objeto ou função apontado pelo operando ponteiro.

O operador _address-of_ embutido cria um ponteiro apontando para o objeto ou função operando.

Os operadores _member of object_ e _pointer to member of object_ fornecem acesso a um membro de dados ou função membro do operando objeto.

Os operadores embutidos _member of pointer_ e _pointer to member of pointer_ fornecem acesso a um membro de dados ou função membro da classe apontada pelo operando ponteiro.

#### Operador de subscrito embutido

As expressões do operador de subscrito têm a forma

---
expr1 ﻿`[` expr2 ﻿`]` | (1) |
---|---|---
expr1 ﻿`[{` expr ﻿`, ...`}]` | (2) | (desde C++11)
expr1 ﻿`[` expr2 ﻿`,` expr ﻿`, ...`]` | (3) | (desde C++23)

1) Para o operador embutido, uma das expressões (expr1 ou expr2) deve ser um glvalue do tipo "array de `T`" ou um prvalue do tipo "ponteiro para `T`", enquanto a outra expressão (expr2 ou expr1, respectivamente) deve ser um prvalue de enumeração sem escopo ou tipo integral. O resultado desta expressão tem o tipo `T`. expr2 não pode ser uma [expressão de vírgula](<#/doc/language/operator_other>) sem parênteses. (desde C++23)

2) A forma com lista entre chaves dentro dos colchetes é usada apenas para chamar um operator[] sobrecarregado.

3) A forma com lista de expressões separadas por vírgulas dentro dos colchetes é usada apenas para chamar um operator[] sobrecarregado.

A expressão de subscrito embutida E1[E2] é exatamente idêntica à expressão *(E1 + E2), exceto por sua categoria de valor (veja abaixo) e [ordem de avaliação](<#/doc/language/eval_order>) (desde C++17): o operando ponteiro (que pode ser o resultado de uma conversão de array para ponteiro, e que deve apontar para um elemento de algum array ou um após o final) é ajustado para apontar para outro elemento do mesmo array, seguindo as regras da [aritmética de ponteiros](<#/doc/language/operator_arithmetic>), e então é desreferenciado.

Quando aplicada a um array, a expressão de subscrito é um [lvalue](<#/doc/language/value_category>) se o array for um lvalue, e um [xvalue](<#/doc/language/value_category>) se não for (desde C++11).

Quando aplicada a um ponteiro, a expressão de subscrito é sempre um lvalue.

O tipo `T` não pode ser um [tipo incompleto](<#/doc/language/incomplete_type>), mesmo que o tamanho ou a estrutura interna de `T` nunca seja usada, como em &x[0].

```cpp
Usar uma expressão de vírgula sem parênteses como segundo argumento (direito) de um operador de subscrito é obsoleto. Por exemplo, a[b, c] é obsoleto e a[(b, c)] não é.  // (desde C++20)
(até C++23)
Uma expressão de vírgula sem parênteses não pode ser o segundo argumento (direito) de um operador de subscrito. Por exemplo, a[b, c] é malformado ou equivalente a a.operator. Parênteses são necessários para usar uma expressão de vírgula como subscrito, por exemplo, a[(b, c)].  // (desde C++23)
```

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada tipo de objeto `T` (possivelmente cv-qualificado), a seguinte assinatura de função participa da resolução de sobrecarga:

T& operator[](T*, [std::ptrdiff_t](<#/doc/types/ptrdiff_t>));
T& operator[]([std::ptrdiff_t](<#/doc/types/ptrdiff_t>), T*);

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <string>
    
    int main()
    {
        int a[4] = {1, 2, 3, 4};
        int* p = &a[2];
        std::cout << p[1] << p[-1] << 1[p] << (-1)[p] << '\n';
    
        std::map<std::pair<int, int>, std::string> m;
        m[{1, 2}] = "abc"; // uses the [{...}] version
    }
```

Saída:
```
    4242
```

#### Operador de indireção embutido

As expressões do operador de indireção têm a forma

---
`*` expr

O operando do operador de indireção embutido deve ser um ponteiro para objeto ou um ponteiro para função, e o resultado é o lvalue que se refere ao objeto ou função para o qual expr aponta. Se expr não apontar realmente para um objeto ou função, o comportamento é indefinido (exceto para o caso especificado por [`typeid`](<#/doc/language/typeid>)).

Um ponteiro para void (possivelmente [cv](<#/doc/language/cv>)-qualificado) não pode ser desreferenciado. Ponteiros para outros tipos incompletos podem ser desreferenciados, mas o lvalue resultante só pode ser usado em contextos que permitem um lvalue de tipo incompleto, por exemplo, ao inicializar uma referência.

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada tipo `T` que é um tipo de objeto (possivelmente cv-qualificado) ou um tipo de função (não const- ou ref-qualificado), a seguinte assinatura de função participa da resolução de sobrecarga:

T& operator*(T*);

Execute este código
```cpp
    #include <iostream>
    
    int f() { return 42; }
    
    int main()
    {
        int n = 1;
        int* pn = &n;
    
        int& r = *pn; // lvalue can be bound to a reference
        int m = *pn;  // indirection + lvalue-to-rvalue conversion
    
        int (*fp)() = &f;
        int (&fr)() = *fp; // function lvalue can be bound to a reference
    
        {}(r, m, fr); // removes possible "unused variable" warnings
    }
```

#### Operador address-of embutido

As expressões do operador address-of têm a forma

---
```cpp
`&` expr  // (1)
`&` class ﻿`::` member  // (2)
```

1) Se o operando for uma expressão lvalue de algum tipo de objeto ou função `T`, `operator&` cria e retorna um prvalue do tipo `T*`, com a mesma qualificação cv, que aponta para o objeto ou função designada pelo operando. Se o operando tiver um tipo incompleto, o ponteiro pode ser formado, mas se esse tipo incompleto for uma classe que define seu próprio operator&, é não especificado se o embutido ou a sobrecarga é usado. Para operandos de tipo com operator& definido pelo usuário, [std::addressof](<#/doc/memory/addressof>) pode ser usado para obter o ponteiro verdadeiro. Note que, ao contrário do C99 e versões posteriores do C, não há um caso especial para o operador unário & aplicado ao resultado do operador unário *.

Se o operando for o nome de uma função sobrecarregada, o endereço pode ser obtido apenas se a sobrecarga puder ser resolvida devido ao contexto. Veja [Endereço de uma função sobrecarregada](<#/doc/language/overloaded_address>) para detalhes. Se expr nomear uma [função membro de objeto explícito](<#/doc/language/member_functions>), expr deve ser um [identificador qualificado](<#/doc/language/name>). Aplicar `&` a um identificador não qualificado que nomeia uma função membro de objeto explícito é malformado. | (desde C++23)

2) Se o operando for um nome qualificado de um membro não estático ou [variante](<#/doc/language/union>) diferente de uma [função membro de objeto explícito](<#/doc/language/member_functions>) (desde C++23), por exemplo, &C::member, o resultado é um prvalue [ponteiro para função membro](<#/doc/language/pointer>) ou [ponteiro para membro de dados](<#/doc/language/pointer>) do tipo `T` na classe `C`. Note que nem &member, nem C::member, nem mesmo &(C::member) podem ser usados para inicializar um ponteiro para membro.

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), este operador não introduz nenhuma assinatura de função adicional: o operador address-of embutido não se aplica se existir um operator& sobrecarregado que seja uma [função viável](<#/doc/language/overload_resolution>).

Execute este código
```cpp
    void f(int) {}
    void f(double) {}
    
    struct A { int i; };
    struct B { void f(); };
    
    int main()
    {
        int n = 1;
        int* pn = &n;    // pointer
        int* pn2 = &*pn; // pn2 == pn
    
        int A::* mp = &A::i;      // pointer to data member
        void (B::*mpf)() = &B::f; // pointer to member function
    
        void (*pf)(int) = &f; // overload resolution due to initialization context
    //  auto pf2 = &f; // error: ambiguous overloaded function type
        auto pf2 = static_cast<void (*)(int)>(&f); // overload resolution due to cast
    }
```

#### Operadores de acesso a membros embutidos

As expressões do operador de acesso a membros têm a forma

---
expr ﻿`.template`(opcional) id-expr | (1) |
---|---|---
expr ﻿`- >template`(opcional) id-expr | (2) |
expr ﻿`.` pseudo-destructor | (3) |
expr ﻿`- >`pseudo-destructor | (4) |

1) A expr deve ser uma expressão de tipo de classe [completo](<#/doc/language/incomplete_type>) `T`.

Se id-expr nomear um [membro estático](<#/doc/language/static>) ou [enumerador](<#/doc/language/enum>), expr é uma [expressão de valor descartado](<#/doc/language/expressions>).

2) A expr deve ser uma expressão de ponteiro para tipo de classe completo `T*`.

3,4) A expr deve ser uma expressão de tipo escalar (veja abaixo).

id-expr é um nome de (formalmente, uma [expressão identificadora](<#/doc/language/name>) que nomeia) um membro de dados ou função membro de `T` ou de uma classe base `B` de `T` não ambígua e acessível (por exemplo, E1.E2 ou E1->E2), opcionalmente [qualificado](<#/doc/language/name>) (por exemplo, E1.B::E2 ou E1->B::E2), opcionalmente usando [disambiguador de template](<#/doc/language/dependent_name>) (por exemplo, E1.template E2 ou E1->template E2).

Se um operator-> definido pelo usuário for chamado, operator-> é chamado novamente no valor resultante, recursivamente, até que um operator-> seja alcançado que retorne um ponteiro simples. Depois disso, a semântica embutida é aplicada a esse ponteiro.

A expressão E1->E2 é exatamente equivalente a (*E1).E2 para tipos embutidos; é por isso que as regras a seguir abordam apenas E1.E2.

Na expressão E1.E2:

1) Se E2 for um [membro de dados estático](<#/doc/language/static>):

  * Se E2 for do tipo de referência `T&` ou `T&&` (desde C++11), o resultado é um lvalue do tipo `T` designando o objeto ou função ao qual a referência está vinculada.
  * Caso contrário, dado o tipo de E2 como `T`, o resultado é um lvalue do tipo `T` designando esse membro de dados estático.

Essencialmente, E1 é avaliado e descartado em ambos os casos.

2) Se E2 for um [membro de dados não estático](<#/doc/language/data_members>):

  * Se E2 for do tipo de referência `T&` ou `T&&` (desde C++11), o resultado é um lvalue do tipo `T` designando o objeto ou função ao qual o membro de referência correspondente de E1 está vinculado.
  * Caso contrário, se E1 for um lvalue, o resultado é um lvalue designando esse membro de dados não estático de E1.
  * Caso contrário (se E1 for um rvalue (até C++17) xvalue (que pode ser [materializado](<#/doc/language/implicit_cast>) de prvalue) (desde C++17)), o resultado é um rvalue (até C++11) xvalue (desde C++11) designando esse membro de dados não estático de E1.

Se E2 não for um membro [mutável](<#/doc/language/cv>), a [cv-qualificação](<#/doc/language/cv>) do resultado é a união das cv-qualificações de E1 e E2; caso contrário (se E2 for um membro mutável), é a união das qualificações voláteis de E1 e E2.

3) Se E2 for um conjunto de sobrecarga (de uma ou mais [funções membro estáticas](<#/doc/language/static>) e [funções membro não estáticas](<#/doc/language/member_functions>)), E1.E2 deve ser o operando esquerdo (possivelmente entre parênteses) de um [operador de chamada de função membro](<#/doc/language/operator_other>), e a [resolução de sobrecarga de função](<#/doc/language/overload_resolution>) é usada para selecionar a função à qual E2 se refere, após isso:

  * Se E2 for uma [função membro estática](<#/doc/language/static>), o resultado é um lvalue designando essa função membro estática. Essencialmente, E1 é avaliado e descartado neste caso.
  * Caso contrário (E2 é uma [função membro não estática](<#/doc/language/member_functions>)), o resultado é um prvalue designando essa função membro não estática de E1.

4) Se E2 for um enumerador membro, dado o tipo de E2 como `T`, o resultado é um rvalue (até C++11) um prvalue (desde C++11) do tipo `T` cujo valor é o valor do enumerador.

5) Se E2 for um [tipo aninhado](<#/doc/language/nested_classes>), o programa é malformado.

6) Se E1 tiver um [ScalarType](<#/doc/named_req/ScalarType>) e E2 for um `~` seguido pelo [nome do tipo](<#/doc/language/type-id>) ou [especificador decltype](<#/doc/language/decltype>) designando o mesmo tipo (menos cv-qualificações), opcionalmente [qualificado](<#/doc/language/name>), o resultado é um tipo especial de prvalue que só pode ser usado como operando esquerdo de um operador de chamada de função, e para nenhum outro propósito

A expressão de chamada de função resultante é chamada de _chamada de pseudo-destrutor_. Ela não recebe argumentos, retorna void, avalia E1 e encerra a vida útil de seu objeto resultante. Este é o único caso em que o operando esquerdo do operador. tem um tipo não-classe. Permitir a chamada de pseudo-destrutor torna possível escrever código sem ter que saber se um destrutor existe para um determinado tipo.

operator. não pode ser sobrecarregado, e para operator->, na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), o operador embutido não introduz nenhuma assinatura de função adicional: o operator-> embutido não se aplica se existir um operator-> sobrecarregado que seja uma [função viável](<#/doc/language/overload_resolution>).

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <memory>
    
    struct P
    {
        template<typename T>
        static T* ptr() { return new T; }
    };
    
    template<typename T>
    struct A
    {
        A(int n): n(n) {}
    
        int n;
        static int sn;
    
        int f() { return 10 + n; }
        static int sf() { return 4; }
    
        class B {};
        enum E {RED = 1, BLUE = 2};
    
        void g()
        {
            typedef int U;
    
            // keyword template needed for a dependent template member
            int* p = T().template ptr<U>();
            p->~U(); // U is int, calls int's pseudo destructor
            delete p;
        }
    };
    
    template<>
    int A<P>::sn = 2;
    
    struct UPtrWrapper
    {
        std::unique_ptr<std::string> uPtr;
        std::unique_ptr<std::string>& operator->() { return uPtr; }
    };
    
    int main()
    {
        A<P> a(1);
        std::cout << a.n << ' '
                  << a.sn << ' '   // A::sn also works
                  << a.f() << ' ' 
                  << a.sf() << ' ' // A::sf() also works
    //            << &a.f << ' '   // error: ill-formed if a.f is not the
                                   // left-hand operand of operator()
    //            << a.B << ' '    // error: nested type not allowed
                  << a.RED << ' '; // enumerator
    
        UPtrWrapper uPtrWrap{std::make_unique<std::string>("wrapped")};
        assert(uPtrWrap->data() == uPtrWrap.operator->().operator->()->data());
    }
```

Saída:
```
    1 2 11 4 1
```

Se E2 for um membro não estático e o resultado de E1 for um objeto cujo tipo não é [similar](<#/doc/language/implicit_cast>) ao tipo de E1, o comportamento é indefinido:
```cpp
    struct A { int i; };
    struct B { int j; };
    struct D : A, B {};
    
    void f()
    {
        D d;
        static_cast<B&>(d).j;      // OK, object expression designates the B subobject of d
        reinterpret_cast<B&>(d).j; // undefined behavior
    }
```

#### Operadores de acesso a ponteiro para membro embutidos

As expressões do operador de acesso a membros através de ponteiros para membros têm a forma

---
lhs ﻿`.*` rhs | (1) |
---|---|---
lhs ﻿`- >*`rhs | (2) |

1) lhs deve ser uma expressão do tipo de classe `T`.

2) lhs deve ser uma expressão do tipo ponteiro para tipo de classe `T*`.

rhs deve ser um rvalue do tipo ponteiro para membro ([dados](<#/doc/language/pointer>) ou [função](<#/doc/language/pointer>)) de `T` ou ponteiro para membro de uma classe base `B` de `T` não ambígua e acessível.

A expressão E1->*E2 é exatamente equivalente a (*E1).*E2 para tipos embutidos; é por isso que as regras a seguir abordam apenas E1.*E2.

Na expressão E1.*E2:

1) se E2 for um ponteiro para membro de dados,

  * se E1 for um lvalue, o resultado é um lvalue designando esse membro de dados,
  * caso contrário (se E1 for um rvalue (até C++17) xvalue (que pode ser [materializado](<#/doc/language/implicit_cast>) de prvalue) (desde C++17)), o resultado é um rvalue (até C++11) xvalue (desde C++11) designando esse membro de dados;

2) se E2 for um ponteiro para função membro, o resultado é um tipo especial de prvalue designando essa função membro que só pode ser usado como operando esquerdo de um operador de chamada de função membro, e para nenhum outro propósito;

3) as regras de cv-qualificação são as mesmas do operador de membro de objeto, com uma regra adicional: um ponteiro para membro que se refere a um membro mutável não pode ser usado para modificar esse membro em um objeto const;

4) se E2 for um valor de ponteiro para membro nulo, o comportamento é indefinido;

5) se o resultado E1 for um objeto cujo tipo não é [similar](<#/doc/language/implicit_cast>) ao tipo de E1, ou seu [objeto mais derivado](<#/doc/language/objects>) não contiver o membro ao qual E2 se refere, o comportamento é indefinido;

6) se E1 for um rvalue e E2 apontar para uma função membro com ref-qualifier `&`, o programa é malformado, a menos que a função membro tenha o cv-qualifier const, mas não volatile (desde C++20);

7) se E1 for um lvalue e E2 apontar para uma função membro com ref-qualifier `& &`, o programa é malformado. | (desde C++11)

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada combinação de tipos `D`, `B`, `R`, onde o tipo de classe `B` é a mesma classe que `D` ou uma classe base de `D` não ambígua e acessível, e `R` é um tipo de objeto ou função, a seguinte assinatura de função participa da resolução de sobrecarga:

R& operator->*(D*, R B::*);

onde ambos os operandos podem ser cv-qualificados, caso em que a cv-qualificação do tipo de retorno é a união da cv-qualificação dos operandos.

Execute este código
```cpp
    #include <iostream>
    
    struct S
    {
        S(int n) : mi(n) {}
        mutable int mi;
        int f(int n) { return mi + n; }
    };
    
    struct D : public S
    {
        D(int n) : S(n) {}
    };
    
    int main()
    {
        int S::* pmi = &S::mi;
        int (S::* pf)(int) = &S::f;
    
        const S s(7);
    //  s.*pmi = 10; // error: cannot modify through mutable
        std::cout << s.*pmi << '\n';
    
        D d(7); // base pointers work with derived object
        D* pd = &d;
        std::cout << (d.*pf)(7) << ' '
                  << (pd->*pf)(8) << '\n';
    }
```

Saída:
```
    7
    14 15
```

### Biblioteca padrão

O operador de subscrito é sobrecarregado por muitas classes de container padrão:

[ operator[]](<#/doc/utility/bitset/operator_at>) | acessa bit específico
(função membro pública de `std::bitset<N>`)
[ operator[]](<#/doc/memory/unique_ptr/operator_at>) | fornece acesso indexado ao array gerenciado
(função membro pública de `std::unique_ptr<T,Deleter>`)
[ operator[]](<#/doc/string/basic_string/operator_at>) | acessa o caractere especificado
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ operator[]](<#/doc/container/array/operator_at>) | acessa elemento especificado
(função membro pública de `std::array<T,N>`)
[ operator[]](<#/doc/container/deque/operator_at>) | acessa elemento especificado
(função membro pública de `std::deque<T,Allocator>`)
[ operator[]](<#/doc/container/vector/operator_at>) | acessa elemento especificado
(função membro pública de `std::vector<T,Allocator>`)
[ operator[]](<#/doc/container/map/operator_at>) | acessa ou insere elemento especificado
(função membro pública de `std::map<Key,T,Compare,Allocator>`)
[ operator[]](<#/doc/container/unordered_map/operator_at>) | acessa ou insere elemento especificado
(função membro pública de `std::unordered_map<Key,T,Hash,KeyEqual,Allocator>`)
[ operator[]](<#/doc/iterator/reverse_iterator/operator_at>) | acessa um elemento por índice
(função membro pública de `std::reverse_iterator<Iter>`)
[ operator[]](<#/doc/iterator/move_iterator/operator_at>)(C++11) | acessa um elemento por índice
(função membro pública de `std::move_iterator<Iter>`)
[ operator[]](<#/doc/numeric/valarray/operator_at>) | obtém/define elemento, fatia ou máscara de valarray
(função membro pública de `std::valarray<T>`)
[ operator[]](<#/doc/regex/match_results/operator_at>) | retorna sub-correspondência especificada
(função membro pública de `std::match_results<BidirIt,Alloc>`)

Os operadores de indireção e membro são sobrecarregados por muitos iterators e classes de smart pointer:

[ operator*operator->](<#/doc/memory/unique_ptr/operator_star_>) | desreferencia ponteiro para o objeto gerenciado
(função membro pública de `std::unique_ptr<T,Deleter>`)
[ operator*operator->](<#/doc/memory/shared_ptr/operator_star_>) | desreferencia o ponteiro armazenado
(função membro pública de `std::shared_ptr<T>`)
[ operator*operator->](<#/doc/memory/auto_ptr/operator_star_>) | acessa o objeto gerenciado
(função membro pública de `std::auto_ptr<T>`)
[ operator*](<#/doc/memory/raw_storage_iterator/operator_star_>) | desreferencia o iterator
(função membro pública de `std::raw_storage_iterator<OutputIt,T>`)
[ operator*operator->](<#/doc/iterator/reverse_iterator/operator_star_>) | desreferencia o iterator subjacente decrementado
(função membro pública de `std::reverse_iterator<Iter>`)
[ operator*](<#/doc/iterator/back_insert_iterator/operator_star_>) | sem operação
(função membro pública de `std::back_insert_iterator<Container>`)
[ operator*](<#/doc/iterator/front_insert_iterator/operator_star_>) | sem operação
(função membro pública de `std::front_insert_iterator<Container>`)
[ operator*](<#/doc/iterator/insert_iterator/operator_star_>) | sem operação
(função membro pública de `std::insert_iterator<Container>`)
[ operator*operator->](<#/doc/iterator/move_iterator/operator_star_>)(C++11)(C++11)(obsoleto em C++20) | acessa o elemento apontado
(função membro pública de `std::move_iterator<Iter>`)
[ operator*operator->](<#/doc/iterator/istream_iterator/operator_star_>) | retorna o elemento atual
(função membro pública de `std::istream_iterator<T,CharT,Traits,Distance>`)
[ operator*](<#/doc/iterator/ostream_iterator/operator_star_>) | sem operação
(função membro pública de `std::ostream_iterator<T,CharT,Traits>`)
[ operator*](<#/doc/iterator/istreambuf_iterator/operator_star_>) | obtém uma cópia do caractere atual
(função membro pública de `std::istreambuf_iterator<CharT,Traits>`)
[ operator*](<#/doc/iterator/ostreambuf_iterator/operator_star_>) | sem operação
(função membro pública de `std::ostreambuf_iterator<CharT,Traits>`)
[ operator*operator->](<#/doc/regex/regex_iterator/operator_star_>) | acessa a correspondência atual
(função membro pública de `std::regex_iterator<BidirIt,CharT,Traits>`)
[ operator*operator->](<#/doc/regex/regex_token_iterator/operator_star_>) | acessa a sub-correspondência atual
(função membro pública de `std::regex_token_iterator<BidirIt,CharT,Traits>`)

Nenhuma classe da biblioteca padrão sobrecarrega operator&. O exemplo mais conhecido de operator& sobrecarregado é a classe COM da Microsoft [`CComPtr`](<https://msdn.microsoft.com/en-us/library/31k6d0k7\(v=vs.100\).aspx>), embora também possa aparecer em EDSLs como [boost.spirit](<https://www.boost.org/doc/libs/release/libs/spirit/doc/html/spirit/qi/reference/operator/and_predicate.html>).

Nenhuma classe da biblioteca padrão sobrecarrega operator->*. Foi sugerido que ele poderia fazer parte da [interface de smart pointer](<https://www.aristeia.com/Papers/DDJ_Oct_1999.pdf>), e de fato é usado nessa capacidade por atores em [boost.phoenix](<https://www.boost.org/doc/libs/release/libs/phoenix/doc/html/phoenix/modules/operator.html#phoenix.modules.operator.member_pointer_operator>), mas é mais comum em EDSLs como [cpp.react](<https://github.com/schlangster/cpp.react/blob/master/include/react/Signal.h#L557>).

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_multidimensional_subscript`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [Operador de subscrito multidimensional](<#/doc/language/operators>)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1213](<https://cplusplus.github.io/CWG/issues/1213.html>) | C++11 | subscritar um rvalue de array resultava em lvalue | reclassificado como xvalue
[CWG 1458](<https://cplusplus.github.io/CWG/issues/1458.html>) | C++98 | aplicar `&` a um lvalue de tipo de classe incompleto que declara operator& resultava em comportamento indefinido | é não especificado qual & é usado
[CWG 1642](<https://cplusplus.github.io/CWG/issues/1642.html>) | C++98 | o rhs nos operadores de acesso a ponteiro para membro embutidos poderia ser um lvalue | só pode ser um rvalue
[CWG 1800](<https://cplusplus.github.io/CWG/issues/1800.html>) | C++98 | ao aplicar `&` a um membro de dados não estático de uma união anônima membro, não estava claro se a união anônima fazia parte do tipo de resultado | a união anônima não é incluída no tipo de resultado
[CWG 2614](<https://cplusplus.github.io/CWG/issues/2614.html>) | C++98 | o resultado de E1.E2 não estava claro se E2 é um membro de referência ou enumerador | esclarecido
[CWG 2725](<https://cplusplus.github.io/CWG/issues/2725.html>) | C++98 | se E2 for uma função membro estática, E1.E2 é bem-formado mesmo que não seja o operando esquerdo de operator() | E1.E2 é malformado neste caso
[CWG 2748](<https://cplusplus.github.io/CWG/issues/2748.html>) | C++98 | o comportamento de E1->E2 não estava claro se E1 é um ponteiro nulo e E2 se refere a um membro estático | o comportamento é indefinido neste caso
[CWG 2813](<https://cplusplus.github.io/CWG/issues/2813.html>) | C++98 | E1 não era uma expressão de valor descartado se E1.E2 nomeasse um membro estático ou enumeração | é
[CWG 2823](<https://cplusplus.github.io/CWG/issues/2823.html>) | C++98 | o comportamento de *expr não estava claro se expr não aponta para um objeto ou função | esclarecido

### Veja também

[Precedência de operadores](<#/doc/language/operator_precedence>)

[Sobrecarga de operadores](<#/doc/language/operators>)

Operadores comuns
---
[atribuição](<#/doc/language/operator_assignment>) | [incremento
decremento](<#/doc/language/operator_incdec>) | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | [comparação](<#/doc/language/operator_comparison>) | **acesso a membro** | [outros](<#/doc/language/operator_other>)
a = b
a += b
a -= b
a *= b
a /= b
a %= b
a &= b
a |= b
a ^= b
a <<= b
a >>= b | ++a
--a
a++
a-- | +a
-a
a + b
a - b
a * b
a / b
a % b
~a
a & b
a | b
a ^ b
a << b
a >> b | !a
a && b
a || b | a == b
a != b
a < b
a > b
a <= b
a >= b
a <=> b | a[...]
*a
&a
a->b
a.b
a->*b
a.*b | chamada de função

a(...)
vírgula

a, b
condicional

a ? b : c
Operadores especiais
[`static_cast`](<#/doc/language/static_cast>) converte um tipo para outro tipo relacionado

[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte um tipo para um tipo não relacionado
[cast estilo C](<#/doc/language/explicit_cast>) converte um tipo para outro por uma mistura de static_cast, const_cast e reinterpret_cast
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)
[`typeid`](<#/doc/language/typeid>) consulta as informações de tipo de um tipo
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)
[Documentação C](<#/>) para operadores de acesso a membros
---