# Modelo de classe

Um modelo de classe define uma família de classes.

### Sintaxe

---
`template` `<` parameter-list `>` class-declaration | (1) |
---|---|---
`template` `<` parameter-list `>` `requires` constraint class-declaration | (2) | (desde C++20)
`export` `template` `<` parameter-list `>` class-declaration | (3) | (removido em C++11)

### Explicação

- **class-declaration** — uma [declaração de classe](<#/doc/language/class>). O nome da classe declarada torna-se um nome de template.
- **parameter-list** — uma lista não vazia separada por vírgulas dos [parâmetros de template](<#/doc/language/template_parameters>), onde cada um é um [parâmetro não-tipo](<#/doc/language/template_parameters>), um [parâmetro de tipo](<#/doc/language/template_parameters>), um [parâmetro de template](<#/doc/language/template_parameters>), ou um [parameter pack](<#/doc/language/parameter_pack>) de qualquer um desses.
- **constraint** — uma [expressão de constraint](<#/doc/language/constraints>) que restringe os parâmetros de template aceitos por este modelo de classe.
`export` era um modificador opcional que declarava o template como _exportado_ (quando usado com um modelo de classe, ele declarava todos os seus membros como exportados também). Arquivos que instanciaram templates exportados não precisavam incluir suas definições: a declaração era suficiente. As implementações de `export` eram raras e divergiam entre si nos detalhes. | (até C++11)

### Instanciação de modelo de classe

Um modelo de classe por si só não é um tipo, ou um objeto, ou qualquer outra entidade. Nenhum código é gerado a partir de um arquivo fonte que contém apenas definições de template. Para que qualquer código apareça, um template deve ser instanciado: os argumentos do template devem ser fornecidos para que o compilador possa gerar uma classe real (ou função, a partir de um modelo de função).

#### Instanciação explícita

---
`template` class-key template-name `<` argument-list `>` `;` | (1) |
---|---|---
`extern` `template` class-key template-name `<` argument-list `>` `;` | (2) | (desde C++11)
- **class-key** — `class`, `struct` ou `union`

1) Definição de instanciação explícita

2) Declaração de instanciação explícita

Uma definição de instanciação explícita força a instanciação da classe, struct ou union a que se referem. Ela pode aparecer no programa em qualquer lugar após a definição do template e, para uma dada argument-list, só é permitida uma vez em todo o programa, sem necessidade de diagnóstico.

Uma declaração de instanciação explícita (um extern template) pula a etapa de instanciação implícita: o código que de outra forma causaria uma instanciação implícita usa, em vez disso, a definição de instanciação explícita fornecida em outro lugar (resultando em erros de link se tal instanciação não existir). Isso pode ser usado para reduzir os tempos de compilação, declarando explicitamente uma instanciação de template em todos os arquivos fonte que a utilizam, exceto um, e definindo-a explicitamente no arquivo restante. | (desde C++11)

Classes, funções, variáveis (desde C++14) e especializações de template de membro podem ser explicitamente instanciadas a partir de seus templates. Funções membro, classes membro e membros de dados estáticos de modelos de classe podem ser explicitamente instanciados a partir de suas definições de membro.

A instanciação explícita só pode aparecer no namespace envolvente do template, a menos que use qualified-id:
```cpp
    namespace N
    {
        template<class T>
        class Y // template definition
        {
            void mf() {}
        };
    }
    
    // template class Y<int>; // error: class template Y not visible in the global namespace
    using N::Y;
    // template class Y<int>; // error: explicit instantiation outside
                              // of the namespace of the template
    template class N::Y<char*>;       // OK: explicit instantiation
    template void N::Y<double>::mf(); // OK: explicit instantiation
```

A instanciação explícita não tem efeito se uma [especialização explícita](<#/doc/language/template_specialization>) apareceu antes para o mesmo conjunto de argumentos de template.

Apenas a declaração é exigida para ser visível ao instanciar explicitamente um modelo de função, um modelo de variável (desde C++14), uma função membro ou membro de dados estáticos de um modelo de classe, ou um modelo de função membro. A definição completa deve aparecer antes da instanciação explícita de um modelo de classe, uma classe membro de um modelo de classe, ou um modelo de classe membro, a menos que uma especialização explícita com os mesmos argumentos de template tenha aparecido antes.

Se um modelo de função, modelo de variável (desde C++14), modelo de função membro, ou função membro ou membro de dados estáticos de um modelo de classe for explicitamente instanciado com uma definição de instanciação explícita, a definição do template deve estar presente na mesma unidade de tradução.

Quando uma instanciação explícita nomeia uma especialização de modelo de classe, ela serve como uma instanciação explícita do mesmo tipo (declaração ou definição) de cada um de seus membros não-herdados e não-template que não foram previamente explicitamente especializados na unidade de tradução. Se esta instanciação explícita for uma definição, ela também é uma definição de instanciação explícita apenas para os membros que foram definidos neste ponto.

Definições de instanciação explícita ignoram especificadores de acesso de membro: tipos de parâmetro e tipos de retorno podem ser privados.

#### Instanciação implícita

Quando o código se refere a um template em um contexto que requer um tipo completamente definido, ou quando a completude do tipo afeta o código, e este tipo particular não foi explicitamente instanciado, ocorre a instanciação implícita. Por exemplo, quando um objeto deste tipo é construído, mas não quando um ponteiro para este tipo é construído.

Isso se aplica aos membros do modelo de classe: a menos que o membro seja usado no programa, ele não é instanciado e não requer uma definição.
```cpp
    template<class T>
    struct Z // template definition
    {
        void f() {}
        void g(); // never defined
    };
    
    template struct Z<double>; // explicit instantiation of Z<double>
    Z<int> a;                  // implicit instantiation of Z<int>
    Z<char>* p;                // nothing is instantiated here
    
    p->f(); // implicit instantiation of Z<char> and Z<char>::f() occurs here.
            // Z<char>::g() is never needed and never instantiated:
            // it does not have to be defined
```

Se um modelo de classe foi declarado, mas não definido, no ponto de instanciação, a instanciação resulta em um tipo de classe incompleto:
```cpp
    template<class T>
    class X;    // declaration, not definition
    
    X<char> ch; // error: incomplete type X<char>
```

[Classes locais](<#/doc/language/class>) e quaisquer templates usados em seus membros são instanciados como parte da instanciação da entidade dentro da qual a classe local ou enumeração é declarada. | (desde C++17)

### Palavras-chave

[`export`](<#/doc/keyword/export>)(até C++11)[`extern`](<#/doc/keyword/extern>)(desde C++11)

### Veja também

  * [parâmetros e argumentos de template](<#/doc/language/template_parameters>) permitem que templates sejam parametrizados
  * [declaração de modelo de função](<#/doc/language/function_template>) declara um modelo de função
  * [especialização de template](<#/doc/language/template_specialization>) define um template existente para um tipo específico
  * [parameter packs](<#/doc/language/parameter_pack>) permite o uso de listas de tipos em templates (desde C++11)
