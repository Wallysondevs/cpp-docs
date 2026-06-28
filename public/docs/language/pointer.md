# Declaração de Ponteiro

Declara uma variável de um tipo ponteiro ou ponteiro para membro.

### Sintaxe

Uma declaração de ponteiro é qualquer declaração simples cujo [declarador](<#/doc/language/declarations>) tem a forma

---
`*` attr ﻿(opcional) cv ﻿(opcional) declarator | (1) |
---|---|---
nested-name-specifier `*` attr ﻿(opcional) cv ﻿(opcional) declarator | (2) |

1) **Declarador de Ponteiro**: a declaração S* D; declara D como um ponteiro para o tipo determinado pela [sequência de especificadores de declaração](<#/doc/language/declarations>) `S`.

2) **Declarador de Ponteiro para Membro**: a declaração S C::* D; declara D como um ponteiro para um membro não estático de `C` do tipo determinado pela sequência de especificadores de declaração `S`.

- **nested-name-specifier** — uma [sequência de nomes e operadores de resolução de escopo `::`](<#/doc/language/name>)
- **attr** — (desde C++11) uma lista de [atributos](<#/doc/language/attributes>)
- **cv** — qualificação const/volatile que se aplica ao ponteiro que está sendo declarado (não ao tipo apontado, cujas qualificações fazem parte da sequência de especificadores de declaração)
- **declarator** — qualquer [declarador](<#/doc/language/declarations>) diferente de um declarador de referência (não existem ponteiros para referências). Pode ser outro declarador de ponteiro (ponteiros para ponteiros são permitidos)

Não existem ponteiros para [referências](<#/doc/language/reference>) e não existem ponteiros para [bit-fields](<#/doc/language/bit_field>). Tipicamente, menções a "ponteiros" sem elaboração não incluem ponteiros para membros (não estáticos).

### Ponteiros

Todo valor de tipo ponteiro é um dos seguintes:

* um _ponteiro para um objeto ou função_ (nesse caso, diz-se que o ponteiro _aponta para_ o objeto ou função), ou
* um _ponteiro após o fim de um objeto_, ou
* o _[valor de ponteiro nulo](<#/doc/language/pointer>)_ para esse tipo, ou
* um _[valor de ponteiro inválido](<#/doc/language/pointer>)_.

Um ponteiro que aponta para um objeto _representa o endereço_ do primeiro byte na memória ocupada pelo objeto. Um ponteiro após o fim de um objeto _representa o endereço_ do primeiro byte na memória após o fim do armazenamento ocupado pelo objeto.

Note que dois ponteiros que representam o mesmo endereço podem, no entanto, ter valores diferentes.
```cpp
    struct C
    {
        int x, y;
    } c;
    
    int* px = &c.x;   // value of px is "pointer to c.x"
    int* pxe= px + 1; // value of pxe is "pointer past the end of c.x"
    int* py = &c.y;   // value of py is "pointer to c.y"
    
    assert(pxe == py); // == tests if two pointers represent the same address
                       // may or may not fire
    
    *pxe = 1; // undefined behavior even if the assertion does not fire
```

A indireção através de um valor de ponteiro inválido e a passagem de um valor de ponteiro inválido para uma função de desalocação têm comportamento indefinido. Qualquer outro uso de um valor de ponteiro inválido tem comportamento definido pela implementação. Algumas implementações podem definir que a cópia de um valor de ponteiro inválido causa uma falha em tempo de execução gerada pelo sistema.

#### Ponteiros para objetos

Um ponteiro para objeto pode ser inicializado com o valor de retorno do [operador de endereço](<#/doc/language/operator_member_access>) aplicado a qualquer expressão de tipo objeto, incluindo outro tipo ponteiro:
```cpp
    int n;
    int* np = &n;          // pointer to int
    int* const* npp = &np; // non-const pointer to const pointer to non-const int
    
    int a[2];
    int (*ap)[2] = &a;     // pointer to array of int
    
    struct S { int n; };
    
    S s = {1};
    int* sp = &s.n;        // pointer to the int that is a member of s
```

Ponteiros podem aparecer como operandos do operador de indireção embutido (operador unário *), que retorna a [expressão lvalue](<#/doc/language/value_category>) que identifica o objeto apontado:
```cpp
    int n;
    int* p = &n;     // pointer to n
    int& r = *p;     // reference is bound to the lvalue expression that identifies n
    r = 7;           // stores the int 7 in n
    std::cout << *p; // lvalue-to-rvalue implicit conversion reads the value from n
```

Ponteiros para objetos de classe também podem aparecer como operandos esquerdos dos operadores de acesso a membro [`operator->`](<#/doc/language/operator_member_access>) e [`operator->*`](<#/doc/language/operator_member_access>).

Devido à conversão implícita de [array para ponteiro](<#/doc/language/implicit_cast>), um ponteiro para o primeiro elemento de um array pode ser inicializado com uma expressão de tipo array:
```cpp
    int a[2];
    int* p1 = a; // pointer to the first element a[0] (an int) of the array a
    
    int b[6][3][8];
    int (*p2)[3][8] = b; // pointer to the first element b[0] of the array b,
                         // which is an array of 3 arrays of 8 ints
```

Devido à conversão implícita de [derivada para base](<#/doc/language/implicit_cast>) para ponteiros, um ponteiro para uma classe base pode ser inicializado com o endereço de uma classe derivada:
```cpp
    struct Base {};
    struct Derived : Base {};
    
    Derived d;
    Base* p = &d;
```

Se `Derived` for [polimórfica](<#/doc/language/objects>), tal ponteiro pode ser usado para fazer [chamadas de função virtual](<#/doc/language/virtual>).

Certos operadores de [adição, subtração](<#/doc/language/operator_arithmetic>), [incremento e decremento](<#/doc/language/operator_incdec>) são definidos para ponteiros para elementos de arrays: tais ponteiros satisfazem os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e permitem que os [algoritmos](<#/doc/algorithm>) da biblioteca C++ funcionem com arrays brutos.

[Operadores de comparação](<#/doc/language/operator_comparison>) são definidos para ponteiros para objetos em algumas situações: dois ponteiros que representam o mesmo endereço comparam como iguais, dois valores de ponteiro nulo comparam como iguais, ponteiros para elementos do mesmo array comparam da mesma forma que os índices de array desses elementos, e ponteiros para membros de dados não estáticos com o mesmo [acesso a membro](<#/doc/language/access>) comparam na ordem de declaração desses membros.

Muitas implementações também fornecem [ordem total estrita](<https://en.wikipedia.org/wiki/Total_order#Strict_total_order> "enwiki:Total order") de ponteiros de origem aleatória, por exemplo, se forem implementados como endereços dentro de um espaço de endereço virtual contínuo. Aquelas implementações que não o fazem (por exemplo, onde nem todos os bits do ponteiro fazem parte de um endereço de memória e precisam ser ignorados para comparação, ou um cálculo adicional é necessário ou, de outra forma, ponteiro e inteiro não são uma relação de 1 para 1), fornecem uma especialização de [std::less](<#/doc/utility/functional/less>) para ponteiros que tem essa garantia. Isso torna possível usar todos os ponteiros de origem aleatória como chaves em contêineres associativos padrão, como [std::set](<#/doc/container/set>) ou [std::map](<#/doc/container/map>).

#### Ponteiros para void

Um ponteiro para objeto de qualquer tipo pode ser [implicitamente convertido](<#/doc/language/implicit_cast>) para ponteiro para void (possivelmente [cv-qualificado](<#/doc/language/cv>)); o valor do ponteiro permanece inalterado. A conversão inversa, que requer [`static_cast`](<#/doc/language/static_cast>) ou [conversão explícita](<#/doc/language/explicit_cast>), produz o valor original do ponteiro:
```cpp
    int n = 1;
    int* p1 = &n;
    void* pv = p1;
    int* p2 = static_cast<int*>(pv);
    std::cout << *p2 << '\n'; // prints 1
```

Se o ponteiro original estiver apontando para um subobjeto de classe base dentro de um objeto de algum tipo polimórfico, [`dynamic_cast`](<#/doc/language/dynamic_cast>) pode ser usado para obter um void* que aponta para o objeto completo do tipo mais derivado.

Ponteiros para void têm o mesmo tamanho, representação e alinhamento que ponteiros para char.

Ponteiros para void são usados para passar objetos de tipo desconhecido, o que é comum em interfaces C: [std::malloc](<#/doc/memory/c/malloc>) retorna void*, [std::qsort](<#/doc/algorithm/qsort>) espera um callback fornecido pelo usuário que aceita dois argumentos const void*. [`pthread_create`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_create.html>) espera um callback fornecido pelo usuário que aceita e retorna void*. Em todos os casos, é responsabilidade do chamador fazer o cast do ponteiro para o tipo correto antes do uso.

#### Ponteiros para funções

Um ponteiro para função pode ser inicializado com o endereço de uma função não-membro ou de uma função membro estática. Devido à conversão implícita de [função para ponteiro](<#/doc/language/implicit_cast>), o operador de endereço é opcional:
```cpp
    void f(int);
    void (*p1)(int) = &f;
    void (*p2)(int) = f; // same as &f
```

Ao contrário de funções ou referências a funções, ponteiros para funções são objetos e, portanto, podem ser armazenados em arrays, copiados, atribuídos, etc.
```cpp
    void (a[10])(int);  // Error: array of functions
    void (&a[10])(int); // Error: array of references
    void (*a[10])(int); // OK: array of pointers to functions
```

Nota: declarações envolvendo ponteiros para funções podem frequentemente ser simplificadas com aliases de tipo:
```cpp
    using F = void(int); // named type alias to simplify declarations
    F a[10];  // Error: array of functions
    F& a[10]; // Error: array of references
    F* a[10]; // OK: array of pointers to functions
```

Um ponteiro para função pode ser usado como o operando esquerdo do [operador de chamada de função](<#/doc/language/operator_other>), isso invoca a função apontada:
```cpp
    int f(int n)
    {
        std::cout << n << '\n';
        return n * n;
    }
    
    int main()
    {
        int (*p)(int) = f;
        int x = p(7);
    }
```

Desreferenciar um ponteiro de função produz o lvalue que identifica a função apontada:
```cpp
    int f();
    int (*p)() = f;  // pointer p is pointing to f
    int (&r)() = *p; // the lvalue that identifies f is bound to a reference
    r();             // function f invoked through lvalue reference
    (*p)();          // function f invoked through the function lvalue
    p();             // function f invoked directly through the pointer
```

Um ponteiro para função pode ser inicializado a partir de um conjunto de sobrecargas que pode incluir funções, especializações de template de função e templates de função, se apenas uma sobrecarga corresponder ao tipo do ponteiro (veja [endereço de uma função sobrecarregada](<#/doc/language/overloaded_address>) para mais detalhes):
```cpp
    template<typename T>
    T f(T n) { return n; }
    
    double f(double n) { return n; }
    
    int main()
    {
        int (*p)(int) = f; // instantiates and selects f<int>
    }
```

[Operadores de comparação de igualdade](<#/doc/language/operator_comparison>) são definidos para ponteiros para funções (eles comparam como iguais se apontarem para a mesma função).

### Ponteiros para membros

#### Ponteiros para membros de dados

Um ponteiro para um objeto membro não estático `m` que é um membro da classe `C` pode ser inicializado exatamente com a expressão &C::m. Expressões como &(C::m) ou &m dentro da função membro de `C` não formam ponteiros para membros.

Tal ponteiro pode ser usado como o operando direito dos [operadores de acesso a ponteiro para membro](<#/doc/language/operator_member_access>) operator.* e operator->*:
```cpp
    struct C { int m; };
    
    int main()
    {
        int C::* p = &C::m;          // pointer to data member m of class C
        C c = {7};
        std::cout << c.*p << '\n';   // prints 7
        C* cp = &c;
        cp->m = 10;
        std::cout << cp->*p << '\n'; // prints 10
    }
```

Um ponteiro para membro de dados de uma classe base não virtual acessível e não ambígua pode ser [implicitamente convertido](<#/doc/language/implicit_cast>) para um ponteiro para o mesmo membro de dados de uma classe derivada:
```cpp
    struct Base { int m; };
    struct Derived : Base {};
    
    int main()
    {
        int Base::* bp = &Base::m;
        int Derived::* dp = bp;
        Derived d;
        d.m = 1;
        std::cout << d.*dp << ' ' << d.*bp << '\n'; // prints 1 1
    }
```

A conversão na direção oposta, de um ponteiro para membro de dados de uma classe derivada para um ponteiro para membro de dados de uma classe base não virtual não ambígua, é permitida com [`static_cast`](<#/doc/language/static_cast>) e [conversão explícita](<#/doc/language/explicit_cast>), mesmo que a classe base não tenha esse membro (mas a classe mais derivada o tenha, quando o ponteiro é usado para acesso):
```cpp
    struct Base {};
    struct Derived : Base { int m; };
    
    int main()
    {
        int Derived::* dp = &Derived::m;
        int Base::* bp = static_cast<int Base::*>(dp);
    
        Derived d;
        d.m = 7;
        std::cout << d.*bp << '\n'; // okay: prints 7
    
        Base b;
        std::cout << b.*bp << '\n'; // undefined behavior
    }
```

O tipo apontado de um ponteiro para membro pode ser um ponteiro para membro em si: ponteiros para membros podem ser multinível e podem ser cv-qualificados de forma diferente em cada nível. Combinações multinível mistas de ponteiros e ponteiros para membros também são permitidas:
```cpp
    struct A
    {
        int m;
        // const pointer to non-const member
        int A::* const p;
    };
    
    int main()
    {
        // non-const pointer to data member which is a const pointer to non-const member
        int A::* const A::* p1 = &A::p;
    
        const A a = {1, &A::m};
        std::cout << a.*(a.*p1) << '\n'; // prints 1
    
        // regular non-const pointer to a const pointer-to-member
        int A::* const* p2 = &a.p;
        std::cout << a.**p2 << '\n'; // prints 1
    }
```

#### Ponteiros para funções membro

Um ponteiro para uma função membro não estática f que é um membro da classe `C` pode ser inicializado exatamente com a expressão &C::f. Expressões como &(C::f) ou &f dentro da função membro de `C` não formam ponteiros para funções membro.

Tal ponteiro pode ser usado como o operando direito dos [operadores de acesso a ponteiro para membro](<#/doc/language/operator_member_access>) operator.* e operator->*. A [expressão resultante](<#/doc/language/value_category>) pode ser usada apenas como o operando esquerdo de um operador de chamada de função:
```cpp
    struct C
    {
        void f(int n) { std::cout << n << '\n'; }
    };
    
    int main()
    {
        void (C::* p)(int) = &C::f; // pointer to member function f of class C
        C c;
        (c.*p)(1);                  // prints 1
        C* cp = &c;
        (cp->*p)(2);                // prints 2
    }
```

Um ponteiro para função membro de uma classe base pode ser [implicitamente convertido](<#/doc/language/implicit_cast>) para um ponteiro para a mesma função membro de uma classe derivada:
```cpp
    struct Base
    {
        void f(int n) { std::cout << n << '\n'; }
    };
    struct Derived : Base {};
    
    int main()
    {
        void (Base::* bp)(int) = &Base::f;
        void (Derived::* dp)(int) = bp;
        Derived d;
        (d.*dp)(1);
        (d.*bp)(2);
    }
```

A conversão na direção oposta, de um ponteiro para função membro de uma classe derivada para um ponteiro para função membro de uma classe base não virtual não ambígua, é permitida com [`static_cast`](<#/doc/language/static_cast>) e [conversão explícita](<#/doc/language/explicit_cast>), mesmo que a classe base não tenha essa função membro (mas a classe mais derivada a tenha, quando o ponteiro é usado para acesso):
```cpp
    struct Base {};
    struct Derived : Base
    {
        void f(int n) { std::cout << n << '\n'; }
    };
    
    int main()
    {
        void (Derived::* dp)(int) = &Derived::f;
        void (Base::* bp)(int) = static_cast<void (Base::*)(int)>(dp);
    
        Derived d;
        (d.*bp)(1); // okay: prints 1
    
        Base b;
        (b.*bp)(2); // undefined behavior
    }
```

Ponteiros para funções membro podem ser usados como callbacks ou como objetos de função, frequentemente após aplicar [std::mem_fn](<#/doc/utility/functional/mem_fn>) ou [std::bind](<#/doc/utility/functional/bind>):

Execute este código
```cpp
    #include <algorithm>
    #include <cstddef>
    #include <functional>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::vector<std::string> v = {"a", "ab", "abc"};
        std::vector<std::size_t> l;
        transform(v.begin(), v.end(), std::back_inserter(l),
                  std::mem_fn(&std::string::size));
        for (std::size_t n : l)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3
```

### Ponteiros nulos

Ponteiros de cada tipo têm um valor especial conhecido como _valor de ponteiro nulo_ desse tipo. Um ponteiro cujo valor é nulo não aponta para um objeto ou uma função (o comportamento de desreferenciar um ponteiro nulo é indefinido), e compara como igual a todos os ponteiros do mesmo tipo cujo valor também é _nulo_.

Uma _constante de ponteiro nulo_ pode ser usada para inicializar um ponteiro para nulo ou para atribuir o valor nulo a um ponteiro existente, é um dos seguintes valores:

* Um literal inteiro com valor zero.

* Um prvalue do tipo [std::nullptr_t](<#/doc/types/nullptr_t>) (geralmente nullptr).

| (desde C++11)

A macro [NULL](<#/doc/types/NULL>) também pode ser usada, ela se expande para uma constante de ponteiro nulo definida pela implementação.

[Inicialização zero](<#/doc/language/zero_initialization>) e [inicialização por valor](<#/doc/language/value_initialization>) também inicializam ponteiros para seus valores nulos.

Ponteiros nulos podem ser usados para indicar a ausência de um objeto (por exemplo, [`std::function::target()`](<#/doc/utility/functional/function/target>)), ou como outros indicadores de condição de erro (por exemplo, [dynamic_cast](<#/doc/language/dynamic_cast>)). Em geral, uma função que recebe um argumento ponteiro quase sempre precisa verificar se o valor é nulo e lidar com esse caso de forma diferente (por exemplo, a [expressão delete](<#/doc/language/delete>) não faz nada quando um ponteiro nulo é passado).

### Ponteiros inválidos

Um valor de ponteiro p é _válido no contexto de_ uma avaliação e se uma das seguintes condições for satisfeita:

* p é um valor de ponteiro nulo.
* p é um ponteiro para função.
* p é um ponteiro para ou após o fim de um objeto o, e e está na duração da região de armazenamento para o.

Se um valor de ponteiro p for usado em uma avaliação e, e p não for válido no contexto de e, então:

* Se e for uma [indireção](<#/doc/language/operator_member_access>) ou uma invocação de uma [função de desalocação](<#/doc/memory/new/operator_delete>), o comportamento é indefinido.
* Caso contrário, o comportamento é definido pela implementação.

```cpp
    int* f()
    {
        int obj;
        int* local_ptr = new (&obj) int;
    
        *local_ptr = 1; // OK, the evaluation “*local_ptr” is
                        // in the storage duration of “obj”
    
        return local_ptr;
    }
    
    int* ptr = f();  // the storage duration of “obj” is expired,
                     // therefore “ptr” is an invalid pointer in the following contexts
    
    int* copy = ptr; // implementation-defined behavior
    *ptr = 2;        // undefined behavior: indirection of an invalid pointer
    delete ptr;      // undefined behavior: deallocating storage from an invalid pointer
```

### Constness

* Se cv aparecer antes de `*` na declaração do ponteiro, faz parte da sequência de especificadores de declaração e se aplica ao objeto apontado.
* Se cv aparecer depois de `*` na declaração do ponteiro, faz parte do [declarador](<#/doc/language/declarations>) e se aplica ao ponteiro que está sendo declarado.

Sintaxe | significado
---|---
const T* | ponteiro para objeto constante
T const* | ponteiro para objeto constante
T* const | ponteiro constante para objeto
const T* const | ponteiro constante para objeto constante
T const* const | ponteiro constante para objeto constante
```cpp
    // pc is a non-const pointer to const int
    // cpc is a const pointer to const int
    // ppc is a non-const pointer to non-const pointer to const int
    const int ci = 10, *pc = &ci, *const cpc = pc, **ppc;
    // p is a non-const pointer to non-const int
    // cp is a const pointer to non-const int
    int i, *p, *const cp = &i;
    
    i = ci;    // okay: value of const int copied into non-const int
    *cp = ci;  // okay: non-const int (pointed-to by const pointer) can be changed
    pc++;      // okay: non-const pointer (to const int) can be changed
    pc = cpc;  // okay: non-const pointer (to const int) can be changed
    pc = p;    // okay: non-const pointer (to const int) can be changed
    ppc = &pc; // okay: address of pointer to const int is pointer to pointer to const int
    
    ci = 1;    // error: const int cannot be changed
    ci++;      // error: const int cannot be changed
    *pc = 2;   // error: pointed-to const int cannot be changed
    cp = &ci;  // error: const pointer (to non-const int) cannot be changed
    cpc++;     // error: const pointer (to const int) cannot be changed
    p = pc;    // error: pointer to non-const int cannot point to const int
    ppc = &p;  // error: pointer to pointer to const int cannot point to
               // pointer to non-const int
```

Em geral, a conversão implícita de um ponteiro multinível para outro segue as regras descritas em [conversões de qualificação](<#/doc/language/implicit_cast>).

### Tipo de ponteiro composto

Quando um operando de um [operador de comparação](<#/doc/language/operator_comparison>) ou qualquer um dos segundo e terceiro operandos de um [operador condicional](<#/doc/language/operator_other>) é um ponteiro ou ponteiro para membro, um tipo de ponteiro composto é determinado como o tipo comum desses operandos.

Dados dois operandos p1 e p2 com tipos `T1` e `T2`, respectivamente, p1 e p2 só podem ter um tipo de ponteiro composto se qualquer uma das seguintes condições for satisfeita:

* p1 e p2 são ambos ponteiros.
* Um de p1 e p2 é um ponteiro e o outro operando é uma constante de ponteiro nulo.

|
* p1 e p2 são ambos constantes de ponteiro nulo, e pelo menos um de `T1` e `T2` é um tipo não integral.

| (desde C++11)
(até C++14)

* Pelo menos um de `T1` e `T2` é um tipo ponteiro, tipo ponteiro para membro ou [std::nullptr_t](<#/doc/types/nullptr_t>).

| (desde C++14)

O _tipo de ponteiro composto_ `C` de p1 e p2 é determinado da seguinte forma:

* Se p1 for uma [constante de ponteiro nulo](<#/doc/language/pointer>), `C` é `T2`.
* Caso contrário, se p2 for uma constante de ponteiro nulo, `C` é `T1`.

| (até C++11)

* Se p1 e p2 forem ambos [constantes de ponteiro nulo](<#/doc/language/pointer>), `C` é [std::nullptr_t](<#/doc/types/nullptr_t>).
* Caso contrário, se p1 for uma constante de ponteiro nulo, `C` é `T2`.
* Caso contrário, se p2 for uma constante de ponteiro nulo, `C` é `T1`.

| (desde C++11)

* Caso contrário, se todas as seguintes condições forem satisfeitas:

    * `T1` ou `T2` é “ponteiro para _cv1_ void”.
    * O outro tipo é “ponteiro para _cv2_ `T`”, onde `T` é um [tipo de objeto](<#/doc/language/type-id>) ou void.

     `C` é “ponteiro para _cv12_ void”, onde _cv12_ é a união de _cv1_ e _cv2_.

* Caso contrário, se todas as seguintes condições forem satisfeitas:

    * `T1` ou `T2` é “ponteiro para tipo de função `F1`”.
    * O outro tipo é “ponteiro para tipo de função noexcept `F2`”.
    * `F1` e `F2` são os mesmos, exceto noexcept.

     `C` é “ponteiro para `F1`”.
| (desde C++17)

* Caso contrário, se todas as seguintes condições forem satisfeitas:

    * `T1` é “ponteiro para `C1`”.
    * `T2` é “ponteiro para `C2`”.
    * Um de `C1` e `C2` é [relacionado por referência](<#/doc/language/reference_initialization>) ao outro.

     `C` é

  * o [tipo combinado por qualificação](<#/doc/language/implicit_cast>) de `T1` e `T2`, se `C1` for relacionado por referência a `C2`, ou
  * o tipo combinado por qualificação de `T2` e `T1`, se `C2` for relacionado por referência a `C1`.

* Caso contrário, se todas as seguintes condições forem satisfeitas:

    * `T1` ou `T2` é “ponteiro para membro de `C1` do tipo de função `F1`”.
    * O outro tipo é “ponteiro para membro de `C2` do tipo de função noexcept `F2`”.
    * Um de `C1` e `C2` é relacionado por referência ao outro.
    * `F1` e `F2` são os mesmos, exceto noexcept.

     `C` é

  * “ponteiro para membro de `C2` do tipo `F1`”, se `C1` for relacionado por referência a `C2`, ou
  * “ponteiro para membro de `C1` do tipo `F1`”, se `C2` for relacionado por referência a `C1`.

| (desde C++17)

* Caso contrário, se todas as seguintes condições forem satisfeitas:

    * `T1` é “ponteiro para membro de `C1` do tipo não-função `M1`”.
    * `T2` é “ponteiro para membro de `C2` do tipo não-função `M2`”
    * `M1` e `M2` são os mesmos, exceto pelas qualificações cv de nível superior.
    * Um de `C1` e `C2` é relacionado por referência ao outro.

     `C` é

  * o tipo combinado por qualificação de `T2` e `T1`, se `C1` for relacionado por referência a `C2`, ou
  * o tipo combinado por qualificação de `T1` e `T2`, se `C2` for relacionado por referência a `C1`.

* Caso contrário, se `T1` e `T2` forem [tipos similares](<#/doc/language/implicit_cast>), `C` é o tipo combinado por qualificação de `T1` e `T2`.
* Caso contrário, p1 e p2 não têm um tipo de ponteiro composto; um programa que necessita da determinação de `C` de tal tipo é malformado.

```cpp
    using p = void*;
    using q = const int*;
    // A determinação do tipo de ponteiro composto de “p” e “q”
    // se enquadra no caso [“ponteiro para cv1 void” e “ponteiro para cv2 T”]:
    // cv1 = vazio, cv2 = const, cv12 = const
    // substitua “cv12 = const” em “ponteiro para cv12 void”:
    // o tipo de ponteiro composto é “const void*”
    
    using pi = int**;
    using pci = const int**;
    // A determinação do tipo de ponteiro composto de “pi” e “pci”
    // se enquadra no caso [ponteiros para tipos similares “C1” e “C2”]:
    // C1 = int*, C2 = const int*
    // eles são tipos relacionados por referência (em ambas as direções) porque são similares
    // o tipo de ponteiro composto é o tipo combinado por qualificação
    // de “p1” e “pc1” (ou o de “pci” e “pi”): “const void* const *”
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 73](<https://cplusplus.github.io/CWG/issues/73.html>) | C++98 | um ponteiro para um objeto nunca compara como igual
a um ponteiro para um após o fim de um array | para ponteiros não nulos e não de função,
comparam os endereços que representam
[CWG 903](<https://cplusplus.github.io/CWG/issues/903.html>) | C++98 | qualquer expressão constante integral que
avalia para 0 era uma constante de ponteiro nulo | limitado a literais
inteiros com valor 0
[CWG 1438](<https://cplusplus.github.io/CWG/issues/1438.html>) | C++98 | o comportamento de usar um valor de ponteiro inválido
de qualquer forma era indefinido | comportamentos diferentes de indireção e
passagem para funções de desalocação
são definidos pela implementação
[CWG 1512](<https://cplusplus.github.io/CWG/issues/1512.html>)
([N3624](<https://wg21.link/N3624>)) | C++98 | a regra do tipo de ponteiro composto era incompleta, e assim
---|---|---
não permitia comparação entre int** e const int** | tornada completa
[CWG 2206](<https://cplusplus.github.io/CWG/issues/2206.html>) | C++98 | um ponteiro para void e um ponteiro para
função tinham um tipo de ponteiro composto | eles não têm tal tipo
[CWG 2381](<https://cplusplus.github.io/CWG/issues/2381.html>) | C++17 | conversões de ponteiro de função não eram permitidas
ao determinar o tipo de ponteiro composto | permitidas
[CWG 2822](<https://cplusplus.github.io/CWG/issues/2822.html>) | C++98 | atingir o fim da duração de uma região
de armazenamento poderia invalidar valores de ponteiro | a validade do ponteiro é baseada
no contexto de avaliação
[CWG 2933](<https://cplusplus.github.io/CWG/issues/2933.html>) | C++98 | ponteiros para funções eram sempre inválidos | eles são sempre válidos

### Ver também

[documentação C](<#/>) para declaração de Ponteiro
---