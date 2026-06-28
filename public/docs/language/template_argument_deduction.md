# Dedução de argumentos de template

Para instanciar um [function template](<#/doc/language/function_template>), cada argumento de template deve ser conhecido, mas nem todo argumento de template precisa ser especificado. Quando possível, o compilador deduzirá os argumentos de template ausentes a partir dos argumentos da função. Isso ocorre quando uma chamada de função é tentada, quando o endereço de um function template é obtido, e em alguns [outros contextos](<#/doc/language/template_argument_deduction>):
```cpp
    template<typename To, typename From>
    To convert(From f);
    
    void g(double d)
    {
        int i = convert<int>(d);    // calls convert<int, double>(double)
        char c = convert<char>(d);  // calls convert<char, double>(double)
        int(*ptr)(float) = convert; // instantiates convert<int, float>(float)
                                    // and stores its address in ptr
    }
```
Este mecanismo possibilita o uso de operadores template, já que não há sintaxe para especificar argumentos de template para um operador a não ser reescrevendo-o como uma expressão de chamada de função:
```cpp
    #include <iostream>
    
    int main()
    {
        std::cout << "Hello, world" << std::endl;
        // operator<< is looked up via ADL as std::operator<<,
        // then deduced to operator<<<char, std::char_traits<char>> both times
        // std::endl is deduced to &std::endl<char, std::char_traits<char>>
    }
```

A dedução de argumentos de template ocorre após a [busca de nome](<#/doc/language/lookup>) do function template (que pode envolver [argument-dependent lookup](<#/doc/language/adl>)) e antes da [substituição de argumentos de template](<#/doc/language/function_template>) (que pode envolver [SFINAE](<#/doc/language/sfinae>)) e da [resolução de sobrecarga](<#/doc/language/overload_resolution>).

A dedução de argumentos de template também é realizada quando o nome de um class template é usado como o tipo de um objeto sendo construído:
```cpp
    std::pair p(2, 4.5);
    std::tuple t(4, 3, 2.5);
    std::copy_n(vi1, 3, std::back_insert_iterator(vi2));
    std::for_each(vi.begin(), vi.end(), Foo(& {...}));
    auto lck = std::lock_guard(foo.mtx);
    std::lock_guard lck2(foo.mtx, ul);
```

```cpp
A dedução de argumentos de template para class templates ocorre em declarações e em expressões de cast explícitas; veja dedução de argumentos de template de classe para detalhes.  // (desde C++17)
```
---|---

### Dedução a partir de uma chamada de função

A dedução de argumentos de template tenta determinar argumentos de template (tipos para parâmetros de template de tipo `T`i, templates para parâmetros de template template `TT`i, e valores para parâmetros de template não-tipo `I`i), que podem ser substituídos em cada parâmetro `P` para produzir o tipo _deduzido_ `A`, que é o mesmo que o tipo do argumento `A`, após os ajustes listados abaixo.

Se houver múltiplos parâmetros, cada par `P`/`A` é deduzido separadamente e os argumentos de template deduzidos são então combinados. Se a dedução falhar ou for ambígua para qualquer par `P`/`A` ou se pares diferentes produzirem argumentos de template deduzidos diferentes, ou se qualquer argumento de template permanecer nem deduzido nem explicitamente especificado, a compilação falha.

Se a remoção de referências e cv-qualificadores de `P` resultar em [std::initializer_list](<#/doc/utility/initializer_list>)<P'> e `A` for um [braced-init-list](<#/doc/language/list_initialization>), então a dedução é realizada para cada elemento da initializer list, tomando `P'` como o parâmetro e o elemento da lista `A'` como o argumento:
```cpp
    template<class T>
    void f(std::initializer_list<T>);
    
    f({1, 2, 3});  // P = std::initializer_list<T>, A = {1, 2, 3}
                   // P'1 = T, A'1 = 1: deduced T = int
                   // P'2 = T, A'2 = 2: deduced T = int
                   // P'3 = T, A'3 = 3: deduced T = int
                   // OK: deduced T = int
    
    f({1, "abc"}); // P = std::initializer_list<T>, A = {1, "abc"}
                   // P'1 = T, A'1 = 1: deduced T = int
                   // P'2 = T, A'2 = "abc": deduced T = const char*
                   // error: deduction fails, T is ambiguous
```

Se a remoção de referências e cv-qualificadores de `P` resultar em `P'`[`N`], e `A` for um braced-init-list não vazio, então a dedução é realizada como acima, exceto se `N` for um parâmetro de template não-tipo, ele é deduzido do comprimento da initializer list:
```cpp
    template<class T, int N>
    void h(T const(&)[N]);
    h({1, 2, 3}); // deduced T = int, deduced N = 3
    
    template<class T>
    void j(T const(&)[3]);
    j({42}); // deduced T = int, array bound is not a parameter, not considered
    
    struct Aggr
    {
        int i;
        int j;
    };
    
    template<int N>
    void k(Aggr const(&)[N]);
    k({1, 2, 3});       // error: deduction fails, no conversion from int to Aggr
    k({{1}, {2}, {3}}); // OK: deduced N = 3
    
    template<int M, int N>
    void m(int const(&)[M][N]);
    m({{1, 2}, {3, 4}}); // deduced M = 2, deduced N = 2
    
    template<class T, int N>
    void n(T const(&)[N], T);
    n({{1}, {2}, {3}}, Aggr()); // deduced T = Aggr, deduced N = 3
```

Se um [parameter pack](<#/doc/language/parameter_pack>) aparecer como o último `P`, então o tipo `P` é comparado com o tipo `A` de cada argumento restante da chamada. Cada correspondência deduz os argumentos de template para a próxima posição na expansão do pack:
```cpp
    template<class... Types>
    void f(Types&...);
    
    void h(int x, float& y)
    {
        const int z = x;
        f(x, y, z); // P = Types&..., A1 = x: deduced first member of Types... = int
                    // P = Types&..., A2 = y: deduced second member of Types... = float
                    // P = Types&..., A3 = z: deduced third member of Types... = const int
                    // calls f<int, float, const int>
    }
```

| (desde C++11)
---|---

Se `P` for um tipo de função, ponteiro para tipo de função, ou ponteiro para tipo de função membro e se `A` for um [conjunto de funções sobrecarregadas](<#/doc/language/overloaded_address>) que não contém function templates, a dedução de argumentos de template é tentada com cada sobrecarga. Se apenas uma for bem-sucedida, essa dedução bem-sucedida é usada. Se nenhuma ou mais de uma for bem-sucedida, o parâmetro de template é um contexto não-deduzido (veja abaixo):
```cpp
    template<class T>
    int f(T(*p)(T));
    
    int g(int);
    int g(char);
    
    f(g); // P = T(*)(T), A = overload set
          // P = T(*)(T), A1 = int(int): deduced T = int
          // P = T(*)(T), A2 = int(char): fails to deduce T
          // only one overload works, deduction succeeds
```

Antes do início da dedução, os seguintes ajustes em `P` e `A` são feitos:

1) Se `P` não for um tipo de referência,

a) se `A` for um tipo array, `A` é substituído pelo tipo ponteiro obtido da conversão de array para ponteiro;

b) caso contrário, se `A` for um tipo de função, `A` é substituído pelo tipo ponteiro obtido da conversão de função para ponteiro;

c) caso contrário, se `A` for um tipo cv-qualificado, os cv-qualificadores de nível superior são ignorados para dedução:
```cpp
    template<class T>
    void f(T);
    
    int a[3];
    f(a); // P = T, A = int[3], adjusted to int*: deduced T = int*
    
    void b(int);
    f(b); // P = T, A = void(int), adjusted to void(*)(int): deduced T = void(*)(int)
    
    const int c = 13;
    f(c); // P = T, A = const int, adjusted to int: deduced T = int
```

2) Se `P` for um tipo cv-qualificado, os cv-qualificadores de nível superior são ignorados para dedução.

3) Se `P` for um tipo de referência, o tipo referenciado é usado para dedução.

4) Se `P` for uma rvalue reference para um parâmetro de template cv-não-qualificado (as chamadas [forwarding references](<#/doc/language/reference>)), e o argumento de chamada de função correspondente for um lvalue, o tipo lvalue reference para `A` é usado no lugar de `A` para dedução (Nota: esta é a base para a ação de [std::forward](<#/doc/utility/forward>). Nota: na [dedução de argumentos de template de classe](<#/doc/language/ctad>), o parâmetro de template de um class template nunca é uma forwarding reference (desde C++17)):
```cpp
    template<class T>
    int f(T&&);       // P is an rvalue reference to cv-unqualified T (forwarding reference)
    
    template<class T>
    int g(const T&&); // P is an rvalue reference to cv-qualified T (not special)
    
    int main()
    {
        int i;
        int n1 = f(i); // argument is lvalue: calls f<int&>(int&) (special case)
        int n2 = f(0); // argument is not lvalue: calls f<int>(int&&)
    
    //  int n3 = g(i); // error: deduces to g<int>(const int&&), which
                       // cannot bind an rvalue reference to an lvalue
    }
```

Após essas transformações, o processo de dedução ocorre conforme descrito abaixo (cf. seção [dedução a partir de um tipo](<#/doc/language/template_argument_deduction>)) e tenta encontrar argumentos de template que tornariam o `A` deduzido (isto é, `P` após os ajustes listados acima e a substituição dos parâmetros de template deduzidos) idêntico ao `A` _transformado_, ou seja, `A` após os ajustes listados acima.

Se a dedução usual de `P` e `A` falhar, as seguintes alternativas são adicionalmente consideradas:

1) Se `P` for um tipo de referência, o `A` deduzido (isto é, o tipo referenciado pela referência) pode ser mais cv-qualificado do que o `A` transformado:
```cpp
    template<typename T>
    void f(const T& t);
    
    bool a = false;
    f(a); // P = const T&, adjusted to const T, A = bool:
          // deduced T = bool, deduced A = const bool
          // deduced A is more cv-qualified than A
```

2) O `A` transformado pode ser outro tipo de ponteiro ou ponteiro para membro que pode ser convertido para o `A` deduzido através de [qualification conversions](<#/doc/language/implicit_cast>) ou uma conversão de ponteiro de função (desde C++17):
```cpp
    template<typename T>
    void f(const T*);
    
    int* p;
    f(p); // P = const T*, A = int*:
          // deduced T = int, deduced A = const int*
          // qualification conversion applies (from int* to const int*)
```

3) Se `P` for uma classe e `P` tiver a forma [simple-template-id](<#/doc/language/templates>), então o `A` transformado pode ser uma classe derivada do `A` deduzido. Da mesma forma, se `P` for um ponteiro para uma classe na forma _simple-template-id_, o `A` transformado pode ser um ponteiro para uma classe derivada apontada pelo `A` deduzido:
```cpp
    template<class T>
    struct B {};
    
    template<class T>
    struct D : public B<T> {};
    
    template<class T>
    void f(B<T>&) {}
    
    void f()
    {
        D<int> d;
        f(d); // P = B<T>&, adjusted to P = B<T> (a simple-template-id), A = D<int>:
              // deduced T = int, deduced A = B<int>
              // A is derived from deduced A
    }
```

#### Contextos não-deduzidos

Nos seguintes casos, os tipos, templates e valores não-tipo que são usados para compor `P` não participam da dedução de argumentos de template, mas em vez disso _usam_ os argumentos de template que foram deduzidos em outro lugar ou explicitamente especificados. Se um parâmetro de template for usado apenas em contextos não-deduzidos e não for explicitamente especificado, a dedução de argumentos de template falha.

1) O nested-name-specifier (tudo à esquerda do operador de resolução de escopo ::) de um tipo que foi especificado usando um [qualified-id](<#/doc/language/name>):
```cpp
    // the identity template, often used to exclude specific arguments from deduction
    // (available as std::type_identity as of C++20)
    template<typename T>
    struct identity { typedef T type; };
    
    template<typename T>
    void bad(std::vector<T> x, T value = 1);
    
    template<typename T>
    void good(std::vector<T> x, typename identity<T>::type value = 1);
    
    std::vector<std::complex<double>> x;
    
    bad(x, 1.2);  // P1 = std::vector<T>, A1 = std::vector<std::complex<double>>
                  // P1/A1: deduced T = std::complex<double>
                  // P2 = T, A2 = double
                  // P2/A2: deduced T = double
                  // error: deduction fails, T is ambiguous
    
    good(x, 1.2); // P1 = std::vector<T>, A1 = std::vector<std::complex<double>>
                  // P1/A1: deduced T = std::complex<double>
                  // P2 = identity<T>::type, A2 = double
                  // P2/A2: uses T deduced by P1/A1 because T is to the left of :: in P2
                  // OK: T = std::complex<double>
```

2) Um [pack indexing specifier](<#/doc/language/pack_indexing>) ou uma [pack indexing expression](<#/doc/language/pack_indexing>):
```cpp
    template<typename... Ts>
    void f(Ts...[0], std::tuple<Ts...>);
    
    f(3, std::tuple(5, 'A'));
    // P2 = std::tuple<Ts...>, A2 = std::tuple<int, char>
    // P2/A2: deduced first member of Ts... = int
    // P2/A2: deduced second member of Ts... = char
    // P1 = Ts...[0], A1 = int: Ts...[0] is in non-deduced context
```

| (desde C++26)
---|---
3) A expressão de um [decltype](<#/doc/language/decltype>)-specifier:
```cpp
    template<typename T>
    void f(decltype(*std::declval<T>()) arg);
    
    int n;
    f<int*>(n); // P = decltype(*declval<T>()), A = int: T is in non-deduced context
```

| (desde C++11)
---|---

4) Um argumento de template não-tipo ou um limite de array no qual uma subexpressão referencia um parâmetro de template:
```cpp
    template<std::size_t N>
    void f(std::array<int, 2 * N> a);
    
    std::array<int, 10> a;
    f(a); // P = std::array<int, 2 * N>, A = std::array<int, 10>:
          // 2 * N is non-deduced context, N cannot be deduced
          // note: f(std::array<int, N> a) would be able to deduce N
```

5) Um parâmetro de template usado no tipo de parâmetro de um parâmetro de função que possui um argumento padrão que está sendo usado na chamada para a qual a dedução de argumento está sendo feita:
```cpp
    template<typename T, typename F>
    void f(const std::vector<T>& v, const F& comp = std::less<T>());
    
    std::vector<std::string> v(3);
    f(v); // P1 = const std::vector<T>&, A1 = std::vector<std::string> lvalue
          // P1/A1 deduced T = std::string
          // P2 = const F&, A2 = std::less<std::string> rvalue
          // P2 is non-deduced context for F (template parameter) used in the
          // parameter type (const F&) of the function parameter comp,
          // that has a default argument that is being used in the call f(v)
```

6) O parâmetro `P`, cujo `A` é uma função ou um conjunto de sobrecargas tal que mais de uma função corresponde a `P` ou nenhuma função corresponde a `P` ou o conjunto de sobrecargas inclui um ou mais function templates:
```cpp
    template<typename T>
    void out(const T& value) { std::cout << value; }
    
    out("123");     // P = const T&, A = const char[4] lvalue: deduced T = char[4]
    out(std::endl); // P = const T&, A = function template: T is in non-deduced context
```

7) O parâmetro `P`, cujo `A` é um braced-init-list, mas `P` não é [std::initializer_list](<#/doc/utility/initializer_list>), uma referência a um (possivelmente cv-qualificado), ou uma referência a um array}}:
```cpp
    template<class T>
    void g1(std::vector<T>);
    
    template<class T>
    void g2(std::vector<T>, T x);
    
    g1({1, 2, 3});     // P = std::vector<T>, A = {1, 2, 3}: T is in non-deduced context
                       // error: T is not explicitly specified or deduced from another P/A
    
    g2({1, 2, 3}, 10); // P1 = std::vector<T>, A1 = {1, 2, 3}: T is in non-deduced context
                       // P2 = T, A2 = int: deduced T = int
```

8) O parâmetro `P` que é um parameter pack e não ocorre no final da lista de parâmetros:
```cpp
    template<class... Ts, class T>
    void f1(T n, Ts... args);
    
    template<class... Ts, class T>
    void f2(Ts... args, T n);
    
    f1(1, 2, 3, 4); // P1 = T, A1 = 1: deduced T = int
                    // P2 = Ts..., A2 = 2, A3 = 3, A4 = 4: deduced Ts = [int, int, int]
    
    f2(1, 2, 3, 4); // P1 = Ts...: Ts is non-deduced context
```

9) A lista de parâmetros de template que aparece dentro do parâmetro `P`, e que inclui uma expansão de pack que não está no final da lista de parâmetros de template:
```cpp
    template<int...>
    struct T {};
    
    template<int... Ts1, int N, int... Ts2>
    void good(const T<N, Ts1...>& arg1, const T<N, Ts2...>&);
    
    template<int... Ts1, int N, int... Ts2>
    void bad(const T<Ts1..., N>& arg1, const T<Ts2..., N>&);
    
    T<1, 2> t1;
    T<1, -1, 0> t2;
    
    good(t1, t2); // P1 = const T<N, Ts1...>&, A1 = T<1, 2>:
                  // deduced N = 1, deduced Ts1 = [2]
                  // P2 = const T<N, Ts2...>&, A2 = T<1, -1, 0>:
                  // deduced N = 1, deduced Ts2 = [-1, 0]
    
    bad(t1, t2);  // P1 = const T<Ts1..., N>&, A1 = T<1, 2>:
                  // <Ts1..., N> is non-deduced context
                  // P2 = const T<Ts2..., N>&, A2 = T<1, -1, 0>:
                  // <Ts2..., N> is non-deduced context
```

| (desde C++11)
---|---

10) Para `P` do tipo array (mas não referência a array ou ponteiro para array), o limite principal do array:
```cpp
    template<int i>
    void f1(int a[10][i]);
    
    template<int i>
    void f2(int a[i][20]);    // P = int[i][20], array type
    
    template<int i>
    void f3(int (&a)[i][20]); // P = int(&)[i][20], reference to array
    
    void g()
    {
        int a[10][20];
        f1(a);     // OK: deduced i = 20
        f1<20>(a); // OK
        f2(a);     // error: i is non-deduced context
        f2<10>(a); // OK
        f3(a);     // OK: deduced i = 10
        f3<10>(a); // OK
    }
```

Em qualquer caso, se qualquer parte de um nome de tipo não for deduzida, o nome de tipo inteiro é um contexto não-deduzido. No entanto, tipos compostos podem incluir nomes de tipo tanto deduzidos quanto não-deduzidos. Por exemplo, em A&lt;T&gt;::B&lt;T2&gt;, `T` não é deduzido devido à regra #1 (nested name specifier), e `T2` não é deduzido porque faz parte do mesmo nome de tipo, mas em void(*f)(typename A&lt;T&gt;::B, A&lt;T&gt;), o `T` em A&lt;T&gt;::B não é deduzido (devido à mesma regra), enquanto o `T` em A&lt;T&gt; é deduzido.

#### Dedução a partir de um tipo

Dado um parâmetro de função `P` que depende de um ou mais parâmetros de template de tipo `T`i, parâmetros de template template `TT`i, ou parâmetros de template não-tipo `I`i, e o argumento correspondente `A`, a dedução ocorre se `P` tiver uma das seguintes formas:

| Esta seção está incompleta
Razão: possivelmente uma tabela com micro-exemplos
---|---
* `_cv_`(opcional) `T`;
* `T*`;
* `T&`;
* `T&&`;
| (desde C++11)
---|---
* `T`(opcional) `[`I`(opcional)`]`;
* `T`(opcional) `(`U`(opcional)`)`;
| (ate C++17)
---|---
* `T`(opcional) `(`U`(opcional)`)` `noexcept(`I`(opcional)`)`;
| (desde C++17)
* `T`(opcional) `U`(opcional)`::*`;
* `TT`(opcional)`<T>`;
* `TT`(opcional)`<I>`;
* `TT`(opcional)`<TU>`;
* `TT`(opcional)`<>`.

Nas formas acima,

* `T`(opcional) ou `U`(opcional) representa um tipo ou lista de tipos de parâmetros que ou satisfaz essas regras recursivamente, é um contexto não-deduzido em `P` ou `A`, ou é o mesmo tipo não-dependente em `P` e `A`.
* `TT`(opcional) ou `TU`(opcional) representa um class template ou um parâmetro de template template.
* `I`(opcional) representa uma expressão que ou é um `I`, é dependente de valor em `P` ou `A`, ou tem o mesmo valor constante em `P` e `A`.
* `noexcept(`I`(opcional)`)` representa uma [especificação de exceção](<#/doc/language/noexcept_spec>) na qual o operando do especificador noexcept possivelmente implícito satisfaz as regras para um `I`(opcional) acima.

| (desde C++17)
---|---

Se `P` tiver uma das formas que incluem uma lista de parâmetros de template `< T>` ou `< I>`, então cada elemento `P`i dessa lista de argumentos de template é comparado com o argumento de template correspondente `A`i de seu `A`. Se o último `P`i for uma expansão de pack, então seu padrão é comparado com cada argumento restante na lista de argumentos de template de `A`. Um parameter pack final que não é deduzido de outra forma, é deduzido como um parameter pack vazio.

Se `P` tiver uma das formas que incluem uma lista de parâmetros de função `(T)`, então cada parâmetro `P`i dessa lista é comparado com o argumento correspondente `A`i da lista de parâmetros de função de `A`. Se o último `P`i for uma expansão de pack, então seu declarator é comparado com cada `A`i restante na lista de tipos de parâmetros de `A`.

As formas podem ser aninhadas e processadas recursivamente:

* X&lt;int&gt;(*)(char[6]) é um exemplo de `T*`, onde `T` é X&lt;int&gt;(char[6]);

* X&lt;int&gt;(char[6]) é um exemplo de `T`(opcional) `(`U`(opcional)`)`, onde `T` é X&lt;int&gt; e `U` é char[6];

| (ate C++17)
---|---

* X&lt;int&gt;(char[6]) é um exemplo de `T`(opcional) `(`U`(opcional)`)` `noexcept(`I`(opcional)`)`, onde `T` é X&lt;int&gt;, `U` é char[6], e `I` no especificador noexcept implícito é false;

| (desde C++17)

* X&lt;int&gt; é um exemplo de `TT`(opcional)`<T>`, onde `TT` é `X` e `T` é int, e
* char[6] é um exemplo de `T`(opcional) `[`I`(opcional)`]`, onde `T` é char e `I` é [std::size_t](<#/doc/types/size_t>)(6).

Argumento de template de tipo não pode ser deduzido do tipo de um argumento de template não-tipo:
```cpp
    template<typename T, T i>
    void f(double a[10][i]);
    
    double v[10][20];
    f(v); // P = double[10][i], A = double[10][20]:
          // i can be deduced to equal 20
          // but T cannot be deduced from the type of i
```

| (ate C++17)
---|---
Quando o valor do argumento correspondente a um parâmetro de template não-tipo P que é declarado com um tipo dependente é deduzido de uma expressão, os parâmetros de template no tipo de P são deduzidos do tipo do valor.
```cpp
    template<long n>
    struct A {};
    
    template<class T>
    struct C;
    
    template<class T, T n>
    struct C<A<n>> { using Q = T; };
    
    typedef long R;
    
    typedef C<A<2>>::Q R; // OK: T was deduced to long
                          // from the template argument value in the type A<2>
    
    template<auto X>
    class bar {};
    
    template<class T, T n>
    void f(bar<n> x);
    
    f(bar<3>{}); // OK: T was deduced to int (and n to 3)
                 // from the template argument value in the type bar<3>
```

O tipo de `N` no tipo `T[N]` é [std::size_t](<#/doc/types/size_t>).
```cpp
    template<class T, T i>
    void f(int (&a)[i]);
    
    int v[10];
    f(v); // OK: T is std::size_t
```

O tipo de `B` no especificador noexcept(B) de um tipo de função é bool.
```cpp
    template<bool>
    struct A {};
    
    template<auto>
    struct B;
    template<auto X, void (*F)() noexcept(X)>
    struct B<F> { A<X> ax; };
    
    void f_nothrow() noexcept;
    B<f_nothrow> bn; // OK: X is deduced as true and the type of X is deduced as bool.
```

| (desde C++17)

Se um parâmetro de template não-tipo de um function template for usado na lista de parâmetros de template de um parâmetro de função (que também é um template), e o argumento de template correspondente for deduzido, o tipo do argumento de template deduzido (conforme especificado em sua lista de parâmetros de template envolvente, o que significa que as referências são preservadas) deve corresponder exatamente ao tipo do parâmetro de template não-tipo, exceto que os cv-qualificadores são descartados, e exceto quando o argumento de template é deduzido de um limite de array — nesse caso, qualquer tipo integral é permitido, mesmo bool, embora sempre se tornaria true:
```cpp
    template<int i>
    class A {};
    
    template<short s>
    void f(A<s>); // the type of the non-type template param is short
    
    void k1()
    {
        A<1> a;  // the type of the non-type template param of a is int
    
        f(a);    // P = A<(short)s>, A = A<(int)1>
                 // error: deduced non-type template argument does not have the same
                 // type as its corresponding template argument
    
        f<1>(a); // OK: the template argument is not deduced,
                 // this calls f<(short)1>(A<(short)1>)
    }
    
    template<int&>
    struct X;
    
    template<int& R>
    void k2(X<R>&);
    
    int n;
    void g(X<n> &x)
    {
        k2(x); // P = X<R>, A = X<n>
               // parameter type is int&
               // argument type is int& in struct X's template declaration
               // OK (with CWG 2091): deduces R to refer to n
    }
```

Parâmetro de template de tipo não pode ser deduzido do tipo de um argumento padrão de função:
```cpp
    template<typename T>
    void f(T = 5, T = 7);
    
    void g()
    {
        f(1);     // OK: calls f<int>(1, 7)
        f();      // error: cannot deduce T
        f<int>(); // OK: calls f<int>(5, 7)
    }
```

A dedução de um parâmetro de template template pode usar o tipo usado na especialização de template utilizada na chamada de função:
```cpp
    template<template<typename> class X>
    struct A {}; // A is a template with a TT param
    
    template<template<typename> class TT>
    void f(A<TT>) {}
    
    template<class T>
    struct B {};
    
    A<B> ab;
    f(ab); // P = A<TT>, A = A<B>: deduced TT = B, calls f(A<B>)
```

### Outros contextos

Além de chamadas de função e expressões de operador, a dedução de argumentos de template é usada nas seguintes situações:

#### Dedução de tipo auto

A dedução de argumentos de template é usada em [declarações](<#/doc/language/declarations>) de variáveis, ao deduzir o significado do **[especificador auto](<#/doc/language/auto>)** a partir do inicializador da variável. O parâmetro `P` é obtido da seguinte forma: em `T`, o tipo declarado da variável que inclui auto, cada ocorrência de auto é substituída por um parâmetro de template de tipo imaginário `U` ou, se a inicialização for copy-list-initialization, por `std::initializer_list<U>`. O argumento `A` é a expressão inicializadora. Após a dedução de `U` de `P` e `A` seguindo as regras descritas acima, o `U` deduzido é substituído em `P` para obter o tipo real da variável:
```cpp
    const auto& x = 1 + 2; // P = const U&, A = 1 + 2:
                           // same rules as for calling f(1 + 2) where f is
                           // template<class U> void f(const U& u)
                           // deduced U = int, the type of x is const int&
    
    auto l = {13}; // P = std::initializer_list<U>, A = {13}:
                   // deduced U = int, the type of l is std::initializer_list<int>
```

Em direct-list-initialization (mas não em copy-list-initialization), ao deduzir o significado de [auto](<#/doc/language/auto>) de um braced-init-list, o braced-init-list deve conter apenas um elemento, e o tipo de auto será o tipo desse elemento:
```cpp
    auto x1 = {3}; // x1 is std::initializer_list<int>
    auto x2{1, 2}; // error: not a single element
    auto x3{3};    // x3 is int
                   // (before N3922 x2 and x3 were both std::initializer_list<int>)
```

| (desde C++11)
---|---

#### Funções com retorno auto

A dedução de argumentos de template é usada em declarações de [funções](<#/doc/language/functions>), ao deduzir o significado do especificador [auto](<#/doc/language/auto>) no tipo de retorno da função, a partir da instrução return. Para funções com retorno auto, o parâmetro `P` é obtido da seguinte forma: em `T`, o tipo de retorno declarado da função que inclui auto, cada ocorrência de auto é substituída por um parâmetro de template de tipo imaginário `U`. O argumento `A` é a expressão da instrução [return](<#/doc/language/return>), e se a instrução return não tiver operando, `A` é void(). Após a dedução de `U` de `P` e `A` seguindo as regras descritas acima, o `U` deduzido é substituído em `T` para obter o tipo de retorno real:
```cpp
    auto f() { return 42; } // P = auto, A = 42:
                            // deduced U = int, the return type of f is int
```

```cpp
Se tal função tiver múltiplas instruções return, a dedução é realizada para cada instrução return. Todos os tipos resultantes devem ser os mesmos e se tornar o tipo de retorno real. Se tal função não tiver instrução return, `A` é void() ao deduzir. Nota: o significado do placeholder decltype(auto) em declarações de variáveis e funções não usa dedução de argumentos de template.  // (desde C++14)
```
---|---

#### Resolução de sobrecarga

A dedução de argumentos de template é usada durante a [resolução de sobrecarga](<#/doc/language/overload_resolution>), ao gerar especializações a partir de uma função template candidata. `P` e `A` são os mesmos que em uma chamada de função regular:
```cpp
    std::string s;
    std::getline(std::cin, s);
    
    // "std::getline" names 4 function templates,
    // 2 of which are candidate functions (correct number of parameters)
    
    // 1st candidate template:
    // P1 = std::basic_istream<CharT, Traits>&, A1 = std::cin
    // P2 = std::basic_string<CharT, Traits, Allocator>&, A2 = s
    // deduction determines the type template parameters CharT, Traits, and Allocator
    // specialization std::getline<char, std::char_traits<char>, std::allocator<char>>
    
    // 2nd candidate template:
    // P1 = std::basic_istream<CharT, Traits>&&, A1 = std::cin
    // P2 = std::basic_string<CharT, Traits, Allocator>&, A2 = s
    // deduction determines the type template parameters CharT, Traits, and Allocator
    // specialization std::getline<char, std::char_traits<char>, std::allocator<char>>
    
    // overload resolution ranks reference binding from lvalue std::cin
    // and picks the first of the two candidate specializations
```

Se a dedução falhar, ou se a dedução for bem-sucedida, mas a especialização que ela produzir seria inválida (por exemplo, um operador sobrecarregado cujos parâmetros não são tipos de classe nem de enumeração), a especialização não é incluída no conjunto de sobrecarga, semelhante a [SFINAE](<#/doc/language/sfinae>).

#### Endereço de um conjunto de sobrecarga

A dedução de argumentos de template é usada ao obter um [endereço de um conjunto de sobrecarga](<#/doc/language/overloaded_address>), que inclui function templates.

O tipo de função do function template é `P`. O [tipo alvo](<#/doc/language/overloaded_address>) é o tipo de `A`:
```cpp
    std::cout << std::endl;
     
    // std::endl names a function template
    // type of endl P =
    // std::basic_ostream<CharT, Traits>& (std::basic_ostream<CharT, Traits>&)
    // operator<< parameter A =
    // std::basic_ostream<char, std::char_traits<char>>& (*)(
    //   std::basic_ostream<char, std::char_traits<char>>&
    // )
    // (other overloads of operator<< are not viable) 
    // deduction determines the type template parameters CharT and Traits
```

Uma regra adicional é aplicada à dedução neste caso: ao comparar os parâmetros de função `P`i e `A`i, se qualquer `P`i for uma rvalue reference para um parâmetro template cv-unqualified (uma "forwarding reference") e o `A`i correspondente for uma lvalue reference, então `P`i é ajustado para o tipo do parâmetro template (T&& torna-se T).

```cpp
Se o tipo de retorno do modelo de função for um placeholder (auto ou decltype(auto)), esse tipo de retorno é um contexto não deduzido e é determinado a partir da instanciação.  // (desde C++14)
```
---|---

#### Ordenação parcial

A dedução de argumentos de template é usada durante a [ordenação parcial de modelos de função sobrecarregados](<#/doc/language/function_template>).

| Esta seção está incompleta
Razão: mini-exemplo
---|---

#### Modelo de função de conversão

A dedução de argumentos de template é usada ao selecionar argumentos de [modelo de função de conversão definida pelo usuário](<#/doc/language/cast_operator>).

`A` é o tipo que é exigido como resultado da conversão. `P` é o tipo de retorno do modelo de função de conversão. Se `P` for um tipo de referência, então o tipo referenciado é usado no lugar de `P` para as partes seguintes da seção.

Se `A` não for um tipo de referência:

a) se `P` for um tipo array, então o tipo ponteiro obtido pela conversão de array para ponteiro é usado no lugar de `P`;

b) se `P` for um tipo de função, então o tipo ponteiro de função obtido pela conversão de função para ponteiro é usado no lugar de `P`;

c) se `P` for cv-qualified, os cv-qualifiers de nível superior são ignorados.

Se `A` for cv-qualified, os cv-qualifiers de nível superior são ignorados. Se `A` for um tipo de referência, o tipo referenciado é usado pela dedução.

Se a dedução usual de `P` e `A` (conforme descrito acima) falhar, as seguintes alternativas são adicionalmente consideradas:

a) se `A` for um tipo de referência, `A` pode ser mais cv-qualified do que o `A` deduzido;

b) se `A` for um tipo ponteiro ou ponteiro para membro, o `A` deduzido pode ser qualquer ponteiro que possa ser convertido para `A` por conversão de qualificação:
```cpp
    struct C
    {
        template<class T>
        operator T***();
    };
    C c;
     
    const int* const* const* p1 = c;
     
    // P = T***, A = const int* const* const*
    // regular function-call deduction for
    // template<class T> void f(T*** p) as if called with the argument
    // of type const int* const* const* fails
    // additional deduction for conversion functions determines T = int
    // (deduced A is int***, convertible to const int* const* const*)
```

```cpp
c) se `A` for um tipo ponteiro de função, o `A` deduzido pode ser um ponteiro para uma função noexcept, conversível para `A` por conversão de ponteiro de função; d) se `A` for um ponteiro para função membro, o `A` deduzido pode ser um ponteiro para uma função membro noexcept, conversível para `A` por conversão de ponteiro de função.  // (desde C++17)
```
---|---

Veja [modelo de membro](<#/doc/language/member_template>) para outras regras relativas a modelos de função de conversão.

#### Instanciação explícita

A dedução de argumentos de template é usada em [instanciações explícitas](<#/doc/language/function_template>), [especializações explícitas](<#/doc/language/template_specialization>), e naquelas [declarações friend](<#/doc/language/friend>) onde o declarator-id se refere a uma especialização de um modelo de função (por exemplo, friend ostream& operator<< <> (...)), se nem todos os argumentos de template forem explicitamente especificados ou padronizados, a dedução de argumentos de template é usada para determinar a qual especialização do template se refere.

`P` é o tipo do modelo de função que está sendo considerado como uma correspondência potencial, e `A` é o tipo de função da declaração. Se não houver correspondências ou mais de uma correspondência (após a ordenação parcial), a declaração da função é malformada:
```cpp
    template<class X>
    void f(X a);        // 1st template f
    template<class X>
    void f(X* a);       // 2nd template f
    template<>
    void f<>(int* a) {} // explicit specialization of f
     
    // P1 = void(X), A1 = void(int*): deduced X = int*, f<int*>(int*)
    // P2 = void(X*), A2 = void(int*): deduced X = int, f<int>(int*)
    // f<int*>(int*) and f<int>(int*) are then submitted to partial ordering
    // which selects f<int>(int*) as the more specialized template
```

Uma regra adicional é aplicada à dedução neste caso: ao comparar os parâmetros de função `P`i e `A`i, se qualquer `P`i for uma rvalue reference para um parâmetro template cv-unqualified (uma "forwarding reference") e o `A`i correspondente for uma lvalue reference, então `P`i é ajustado para o tipo do parâmetro template (T&& torna-se T).

#### Modelo de função de desalocação

A dedução de argumentos de template é usada ao determinar se uma especialização de [modelo de função de desalocação](<#/doc/memory/new/operator_delete>) corresponde a uma determinada forma de placement de `operator new`.

`P` é o tipo do modelo de função que está sendo considerado como uma correspondência potencial, e `A` é o tipo de função da função de desalocação que seria a correspondência para o placement operator new em consideração. Se não houver correspondência ou mais de uma correspondência (após a resolução de sobrecarga), a função de desalocação de placement não é chamada (pode ocorrer vazamento de memória):
```cpp
    struct X
    {
        X() { throw std::runtime_error(""); }
     
        static void* operator new(std::size_t sz, bool b)   { return ::operator new(sz); }
        static void* operator new(std::size_t sz, double f) { return ::operator new(sz); }
     
        template<typename T>
        static void operator delete(void* ptr, T arg)
        {
            ::operator delete(ptr);
        }
    };
     
    int main()
    {
        try
        {
            X* p1 = new (true) X; // when X() throws, operator delete is looked up
                                  // P1 = void(void*, T), A1 = void(void*, bool):
                                  // deduced T = bool
                                  // P2 = void(void*, T), A2 = void(void*, double):
                                  // deduced T = double
                                  // overload resolution picks operator delete<bool>
        }
        catch(const std::exception&) {}
     
        try
        {
            X* p1 = new (13.2) X; // same lookup, picks operator delete<double>
        }
        catch(const std::exception&) {}
    }
```

### Modelos de alias

[Modelos de alias](<#/doc/language/type_alias>) não são deduzidos, exceto na [dedução de argumentos de template de classe](<#/doc/language/ctad>) (desde C++20):
```cpp
    template<class T>
    struct Alloc {};
     
    template<class T>
    using Vec = vector<T, Alloc<T>>;
    Vec<int> v;
     
    template<template<class, class> class TT>
    void g(TT<int, Alloc<int>>);
    g(v); // OK: deduced TT = vector
     
    template<template<class> class TT>
    void f(TT<int>);
    f(v); // error: TT cannot be deduced as "Vec" because Vec is an alias template
```

### Conversões implícitas

A dedução de tipo não considera conversões implícitas (além dos ajustes de tipo listados acima): essa é a tarefa da [resolução de sobrecarga](<#/doc/language/overload_resolution>), que ocorre posteriormente. No entanto, se a dedução for bem-sucedida para todos os parâmetros que participam da dedução de argumentos de template, e todos os argumentos de template que não são deduzidos forem explicitamente especificados ou padronizados, então os parâmetros de função restantes são comparados com os argumentos de função correspondentes. Para cada parâmetro `P` restante com um tipo que era não-dependente antes da substituição de quaisquer argumentos de template explicitamente especificados, se o argumento `A` correspondente não puder ser implicitamente convertido para `P`, a dedução falha.

Parâmetros com tipos dependentes nos quais nenhum parâmetro de template participa da dedução de argumentos de template, e parâmetros que se tornaram não-dependentes devido à substituição de argumentos de template explicitamente especificados serão verificados durante a resolução de sobrecarga:
```cpp
    template<class T>
    struct Z { typedef typename T::x xx; };
     
    template<class T>
    typename Z<T>::xx f(void*, T); // #1
     
    template<class T>
    void f(int, T);                // #2
     
    struct A {} a;
     
    int main()
    {
        f(1, a); // for #1, deduction determines T = struct A, but the remaining argument 1
                 // cannot be implicitly converted to its parameter void*: deduction fails
                 // instantiation of the return type is not requested
                 // for #2, deduction determines T = struct A, and the remaining argument 1
                 // can be implicitly converted to its parameter int: deduction succeeds
                 // the function call compiles as a call to #2 (deduction failure is SFINAE)
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 70](<https://cplusplus.github.io/CWG/issues/70.html>) | C++98 | se os limites de array seriam deduzidos não era especificado | especificado como não deduzido
[CWG 300](<https://cplusplus.github.io/CWG/issues/300.html>) | C++98 | a dedução ocorria para parâmetros de função na forma `type(*)(T)/T(*)()/T(*)(T)`, ponteiros de função correspondiam a essas formas, mas referências de função não | alterar essas formas para `type(T)/T()/T(T)` para que também possam cobrir referências
[CWG 322](<https://cplusplus.github.io/CWG/issues/322.html>) | C++98 | parâmetros de tipo de tipos de referência não eram ajustados para usar o tipo referenciado para dedução | ajuste adicionado
[CWG 976](<https://cplusplus.github.io/CWG/issues/976.html>) | C++98 | na dedução para modelos de operador de conversão, o tipo de retorno `const T&` nunca poderia corresponder ao tipo de resultado `T` | regras ajustadas para permitir tais correspondências
[CWG 1387](<https://cplusplus.github.io/CWG/issues/1387.html>) | C++11 | a expressão de um decltype-specifier não era um contexto não deduzido | é
[CWG 1391](<https://cplusplus.github.io/CWG/issues/1391.html>) | C++98 | o efeito de conversões implícitas dos argumentos que não estão envolvidos na dedução não era especificado | especificado conforme descrito acima
[CWG 1591](<https://cplusplus.github.io/CWG/issues/1591.html>) | C++11 | não é possível deduzir o limite do array e o tipo do elemento de uma _braced-init-list_ | dedução permitida
[CWG 2052](<https://cplusplus.github.io/CWG/issues/2052.html>) | C++98 | deduzir um operador com argumentos não-classe e não-enum era um erro grave | erro suave se houver outras sobrecargas
[CWG 2091](<https://cplusplus.github.io/CWG/issues/2091.html>) | C++98 | deduzir um parâmetro não-tipo de referência não funcionava devido a incompatibilidade de tipo com o argumento | incompatibilidade de tipo evitada
[N3922](<https://wg21.link/N3922>) | C++11 | a inicialização direta por lista de auto deduz [std::initializer_list](<#/doc/utility/initializer_list>) | malformado para mais de um elemento, deduzir o tipo do elemento para um único elemento
[CWG 2355](<https://cplusplus.github.io/CWG/issues/2355.html>) | C++17 | o valor em um especificador noexcept de um tipo de função não era deduzível | tornado deduzível