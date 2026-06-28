# Entidades locais da unidade de tradução (TU-local) (desde C++20)

Entidades locais da unidade de tradução (TU-local) são introduzidas para evitar que entidades que deveriam ser locais (não usadas em nenhuma outra unidade de tradução) sejam expostas e utilizadas em outras unidades de tradução.

Um exemplo de [Understanding C++ Modules: Part 2](<https://vector-of-bool.github.io/2019/03/31/modules-2.html>) ilustra o problema de não restringir as exposições:
```cpp
    // Unidade de módulo sem restrições TU-local
    export module Foo;
     
    import <iostream>;
     
    namespace
    {
       class LolWatchThis {        // ligação interna, não pode ser exportada
           static void say_hello()
           {
               std::cout << "Hello, everyone!\n";
           }
       };
    }
     
    export LolWatchThis lolwut() { // LolWatchThis é exposta como tipo de retorno
        return LolWatchThis();
    }
```
```cpp
    // main.cpp
    import Foo;
     
    int main()
    {
        auto evil = lolwut();        // 'evil' tem o tipo de 'LolWatchThis'
        decltype(evil)::say_hello(); // a definição de 'LolWatchThis' não é mais interna
    }
```

### Entidades TU-local

Uma entidade é _TU-local_ se for

  1. um tipo, função, variável ou template que
     1. tem um nome com [ligação interna](<#/doc/language/storage_duration>), ou
     2. não tem um nome com ligação e é declarado, ou introduzido por uma [expressão lambda](<#/doc/language/lambda>), dentro da definição de uma entidade TU-local,
  2. um tipo sem nome que é definido fora de um [class-specifier](<#/doc/language/class>), corpo de função ou inicializador, ou é introduzido por um defining-type-specifier (type-specifier, class-specifier ou enum-specifier) que é usado para declarar apenas entidades TU-local,
  3. uma especialização de um template TU-local,
  4. uma especialização de um template com qualquer argumento de template TU-local, ou
  5. uma especialização de um template cuja declaração (possivelmente instanciada) é uma exposição (definida abaixo).

```cpp
    // Entidades TU-local com ligação interna
    namespace { // todos os nomes declarados em namespace sem nome têm ligação interna
        int tul_var = 1;                          // variável TU-local
        int tul_func() { return 1; }              // função TU-local
        struct tul_type { int mem; };             // tipo (de classe) TU-local
    }
    template<typename T>
    static int tul_func_temp() { return 1; }      // template TU-local
     
    // Especialização de template TU-local
    template<>
    static int tul_func_temp<int>() { return 3; } // especialização TU-local
     
    // Especialização de template com argumento de template TU-local
    template <> struct std::hash<tul_type> {      // especialização TU-local
        std::size_t operator()(const tul_type& t) const { return 4u; }
    };
```

| Esta seção está incompleta
Razão: faltam exemplos das regras #1.2, #2 e #5

Um valor ou objeto é _TU-local_ se for

  1. é, ou é um ponteiro para, uma função TU-local ou o objeto associado a uma variável TU-local, ou
  2. é um objeto de tipo classe ou array e qualquer um de seus [subobjetos](<#/doc/language/objects>) ou qualquer um dos objetos ou funções aos quais seus membros de dados não estáticos de tipo referência se referem é TU-local e é [utilizável em expressões constantes](<#/doc/language/constant_expression>).

```cpp
    static int tul_var = 1;             // variável TU-local
    static int tul_func() { return 1; } // função TU-local
     
    int* tul_var_ptr = &tul_var;        // TU-local: ponteiro para variável TU-local
    int (* tul_func_ptr)() = &tul_func; // TU-local: ponteiro para função TU-local
     
    constexpr static int tul_const = 1; // variável TU-local utilizável em expressões constantes
    int tul_arr[] = { tul_const };      // TU-local: array de objeto constexpr TU-local
    struct tul_class { int mem; };
    tul_class tul_obj{tul_const};       // TU-local: tem membro objeto constexpr TU-local
```

### Exposições

Uma declaração D _nomeia_ uma entidade E se

  1. D contém uma expressão lambda cujo tipo de closure é E,
  2. E não é uma função ou template de função e D contém um id-expression, type-specifier, nested-name-specifier, template-name ou concept-name denotando E, ou
  3. E é uma função ou template de função e D contém uma expressão que nomeia E ou um id-expression que se refere a um conjunto de sobrecargas que contém E.

```cpp
    // nomeação de lambda
    auto x = [] {}; // nomeia decltype(x)
     
    // nomeação não-função (template)
    int y1 = 1;                      // nomeia y1 (id-expression)
    struct y2 { int mem; };
    y2 y2_obj{1};                    // nomeia y2 (type-specifier)
    struct y3 { int mem_func(); };
    int y3::mem_func() { return 0; } // nomeia y3 (nested-name-specifier)
    template<typename T> int y4 = 1;
    int var = y4<y2>;                // nomeia y4 (template-name)
    template<typename T> concept y5 = true;
    template<typename T> void func(T&&) requires y5<T>; // nomeia y5 (concept-name)
     
    // nomeação de função (template)
    int z1(int arg)    { std::cout << "no overload"; return 0; }
    int z2(int arg)    { std::cout << "overload 1";  return 1; }
    int z2(double arg) { std::cout << "overload 2";  return 2; }
     
    int val1 = z1(0); // nomeia z1
    int val2 = z2(0); // nomeia z2 ( int z2(int) )
```

Uma declaração é uma _exposição_ se ela nomeia uma entidade TU-local, ignorando

  1. o corpo da função para uma função não-inline ou template de função (mas não o tipo de retorno deduzido para uma definição (possivelmente instanciada) de uma função com um tipo de retorno declarado que usa um [tipo placeholder](<#/doc/language/auto>)),
  2. o inicializador para uma variável ou template de variável (mas não o tipo da variável),
  3. declarações friend em uma definição de classe, e
  4. qualquer referência a um objeto const não-volátil ou referência com ligação interna ou sem ligação inicializada com uma expressão constante que não é um [odr-use](<#/doc/language/definition>),

ou define uma variável constexpr inicializada para um valor TU-local.

| Esta seção está incompleta
Razão: faltam exemplos para exposições

### Restrições TU-local

Se uma [declaração](<#/doc/language/declarations>) (possivelmente instanciada) de, ou um [guia de dedução](<#/doc/language/ctad>) para, uma entidade não-TU-local em uma [unidade de interface de módulo](<#/doc/language/modules>) (fora do fragmento de módulo privado, se houver) ou partição de módulo for uma exposição, o programa é malformado. Tal declaração em qualquer outro contexto é descontinuada.

Se uma declaração que aparece em uma unidade de tradução nomeia uma entidade TU-local declarada em outra unidade de tradução que não é uma unidade de cabeçalho, o programa é malformado. Uma declaração instanciada para uma especialização de template aparece no ponto de instanciação da especialização.

| Esta seção está incompleta
Razão: faltam exemplos para restrições

### Exemplo

Unidade de tradução #1:
```cpp
    export module A;
    static void f() {}
    inline void it() { f(); }         // erro: é uma exposição de f
    static inline void its() { f(); } // OK
    template<int> void g() { its(); } // OK
    template void g<0>();
     
    decltype(f) *fp;                             // erro: f (embora não seu tipo) é TU-local
    auto &fr = f;                                // OK
    constexpr auto &fr2 = fr;                    // erro: é uma exposição de f
    constexpr static auto fp2 = fr;              // OK
    struct S { void (&ref)(); } s{f};            // OK: valor é TU-local
    constexpr extern struct W { S &s; } wrap{s}; // OK: valor não é TU-local
     
    static auto x = []{ f(); }; // OK
    auto x2 = x;                // erro: o tipo de closure é TU-local
    int y = ([]{ f(); }(), 0);  // erro: o tipo de closure não é TU-local
    int y2 = (x, 0);            // OK
     
    namespace N
    {
        struct A {};
        void adl(A);
        static void adl(int);
    }
    void adl(double);
     
    inline void h(auto x) { adl(x); } // OK, mas uma especialização pode ser uma exposição
```

Unidade de tradução #2:
```cpp
    module A;
    void other()
    {
        g<0>();                  // OK: especialização é explicitamente instanciada
        g<1>();                  // erro: instanciação usa its TU-local
        h(N::A{});               // erro: conjunto de sobrecargas contém N::adl(int) TU-local
        h(0);                    // OK: chama adl(double)
        adl(N::A{});             // OK; N::adl(int) não encontrado, chama N::adl(N::A)
        fr();                    // OK: chama f
        constexpr auto ptr = fr; // erro: fr não é utilizável em expressões constantes aqui
    }
```

| Esta seção está incompleta
Razão: exemplos são muito complexos, precisam de melhor arranjo