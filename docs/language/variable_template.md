# Template de variável (desde C++14)

Um template de variável define uma família de variáveis ou membros de dados estáticos.

### Sintaxe

---
`template` `<` parameter-list `>` variable-declaration | (1) |
---|---|---
`template` `<` parameter-list `>` `requires` constraint variable-declaration | (2) | (desde C++20)
- **variable-declaration** — uma [declaração](<#/doc/language/declarations>) de uma variável. O nome da variável declarada torna-se um nome de template.
- **parameter-list** — uma lista não vazia separada por vírgulas dos [parâmetros de template](<#/doc/language/template_parameters>), cada um dos quais é um [parâmetro não-tipo](<#/doc/language/template_parameters>), um [parâmetro de tipo](<#/doc/language/template_parameters>), um [parâmetro de template](<#/doc/language/template_parameters>), ou um [parameter pack](<#/doc/language/parameter_pack>) de qualquer um desses.
- **constraint** — uma [expressão de restrição](<#/doc/language/constraints>) que restringe os parâmetros de template aceitos por este template de variável.

### Explicação

Uma variável instanciada a partir de um template de variável é chamada de _variável instanciada_. Um membro de dados estático instanciado a partir de um template de membro de dados estático é chamado de _membro de dados estático instanciado_.

Um template de variável pode ser introduzido por uma declaração de template no escopo de namespace, onde variable-declaration declara uma variável.
```cpp
    template<class T>
    constexpr T pi = T(3.1415926535897932385L); // variable template
    
    template<class T>
    T circular_area(T r) // function template
    {
        return pi<T> * r * r; // pi<T> is a variable template instantiation
    }
```

Quando usado no escopo de classe, o template de variável declara um template de membro de dados estático.
```cpp
    using namespace std::literals;
    struct matrix_constants
    {
        template<class T>
        using pauli = hermitian_matrix<T, 2>; // alias template
    
        template<class T> // static data member template
        static constexpr pauli<T> sigmaX = {{0, 1}, {1, 0}};
    
        template<class T>
        static constexpr pauli<T> sigmaY = {{0, -1i}, {1i, 0}};
    
        template<class T>
        static constexpr pauli<T> sigmaZ = {{1, 0}, {0, -1}};
    };
```

Assim como outros [membros estáticos](<#/doc/language/static>), uma definição de um template de membro de dados estático pode ser necessária. Tal definição é fornecida fora da definição da classe. Uma declaração de template de um membro de dados estático no escopo de namespace também pode ser uma definição de um [membro de dados não-template de um template de classe](<#/doc/language/member_template>):
```cpp
    struct limits
    {
        template<typename T>
        static const T min; // declaration of a static data member template
    };
    
    template<typename T>
    const T limits::min = { }; // definition of a static data member template
    
    template<class T>
    class X
    {
        static T s; // declaration of a non-template static data member of a class template
    };
    
    template<class T>
    T X<T>::s = 0; // definition of a non-template data member of a class template
```

A menos que um template de variável tenha sido [explicitamente especializado](<#/doc/language/template_specialization>) ou explicitamente instanciado, ele é implicitamente instanciado quando uma especialização do template de variável é referenciada em um contexto que exige [a existência de uma definição de variável](<#/doc/language/definition>) ou se a existência da definição afeta a semântica do programa, ou seja, se a variável é [necessária para avaliação constante](<#/doc/language/constant_expression>) por uma expressão (a definição pode não ser usada).

A existência de uma definição de uma variável é considerada para afetar a semântica do programa se a variável for necessária para avaliação constante por uma expressão, mesmo que a avaliação constante da expressão não seja exigida ou se a avaliação da expressão constante não usar a definição.

### Notas

Até que os templates de variável fossem introduzidos no C++14, variáveis parametrizadas eram tipicamente implementadas como membros de dados estáticos de templates de classe ou como templates de função `constexpr` que retornavam os valores desejados.

Templates de variável não podem ser usados como [argumentos de template template](<#/doc/language/template_parameters>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_variable_templates`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Templates de variável

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2255](<https://cplusplus.github.io/CWG/issues/2255.html>) | C++14 | não estava claro se uma especialização de um template de membro de dados estático é um membro de dados estático | é