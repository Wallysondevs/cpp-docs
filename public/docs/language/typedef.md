# especificador typedef

*   `typedef` \- cria um alias que pode ser usado em qualquer lugar no lugar de um nome de tipo (possivelmente complexo).

### Explicação

O especificador typedef, quando usado em uma [declaração](<#/doc/language/declarations>), especifica que a declaração é uma _declaração typedef_ em vez de uma declaração de variável ou função.

Tipicamente, o especificador typedef aparece no início da declaração, embora seja permitido aparecer após os [especificadores de tipo](<#/doc/language/declarations>), ou entre dois especificadores de tipo. O especificador typedef não pode ser combinado com nenhum outro especificador, exceto os especificadores de tipo.

Uma declaração typedef pode declarar um ou muitos identificadores na mesma linha (por exemplo, int e um ponteiro para int), pode declarar tipos de array e função, ponteiros e referências, tipos de classe, etc. Cada identificador introduzido nesta declaração torna-se um _nome typedef_, que é um sinônimo para o tipo do objeto ou função que ele se tornaria se a palavra-chave typedef fosse removida.

Os nomes typedef são aliases para tipos existentes e não são declarações de novos tipos. typedef não pode ser usado para alterar o significado de um nome de tipo existente (incluindo um nome typedef). Uma vez declarado, um nome typedef só pode ser redeclarado para se referir ao mesmo tipo novamente. Nomes typedef só estão em vigor no escopo onde são visíveis: diferentes funções ou declarações de classe podem definir tipos com nomes idênticos e significados diferentes.

O especificador typedef não pode aparecer na declaração de um parâmetro de função nem na decl-specifier-seq de uma [definição de função](<#/doc/language/function>):
```cpp
    void f1(typedef int param); // ill-formed
    typedef int f2() {}         // ill-formed
```

O especificador typedef não pode aparecer em uma declaração que não contenha um declarador:
```cpp
    typedef struct X {}; // ill-formed
```

### Nome typedef para fins de linkage

Se uma declaração typedef define uma [classe](<#/doc/language/classes>) ou [enumeração](<#/doc/language/enum>) sem nome, o primeiro nome typedef do tipo de classe ou tipo de enumeração declarado pela declaração é o _nome typedef para fins de linkage_ desse tipo.

Por exemplo, em typedef struct { /* ... */ } S;, `S` é um nome typedef para fins de linkage. O tipo de classe ou enumeração definido desta forma tem [linkage externo](<#/doc/language/storage_duration>) (a menos que esteja em um namespace sem nome).

Uma classe sem nome definida desta forma deve conter apenas construções compatíveis com C. Em particular, ela não deve

*   declarar quaisquer membros além de membros de dados não estáticos, enumerações de membros ou classes de membros,
*   ter quaisquer [classes base](<#/doc/language/derived_class>) ou [inicializadores de membro padrão](<#/doc/language/data_members>), ou
*   conter uma [expressão lambda](<#/doc/language/lambda>),

e todas as classes de membros também devem satisfazer esses requisitos (recursivamente). | (desde C++20)

### Notas

```cpp
Aliases de tipo fornecem a mesma funcionalidade que as declarações typedef usando uma sintaxe diferente, e também são aplicáveis a nomes de template.  // (desde C++11)
```

### Palavras-chave

[`typedef`](<#/doc/keyword/typedef>)

### Exemplo
```cpp
    // simple typedef
    typedef unsigned long ulong;
    
    // the following two objects have the same type
    unsigned long l1;
    ulong l2;
    
    // more complicated typedef
    typedef int int_t, *intp_t, (&fp)(int, ulong), arr_t[10];
    
    // the following two objects have the same type
    int a1[10];
    arr_t a2;
    
    // beware: the following two objects do not have the same type
    const intp_t p1 = 0; // int *const p1 = 0
    const int *p2;
    
    // common C idiom to avoid having to write "struct S"
    typedef struct { int a; int b; } S, *pS;
    
    // the following two objects have the same type
    pS ps1;
    S* ps2;
    
    // error: storage-class-specifier cannot appear in a typedef declaration
    // typedef static unsigned int uint;
    
    // typedef can be used anywhere in the decl-specifier-seq
    long unsigned typedef int long ullong;
    // more conventionally spelled "typedef unsigned long long int ullong;"
    
    // std::add_const, like many other metafunctions, use member typedefs
    template<class T>
    struct add_const
    {
        typedef const T type;
    };
    
    typedef struct Node
    {
        struct listNode* next; // declares a new (incomplete) struct type named listNode
    } listNode; // error: conflicts with the previously declared struct name
    
    // C++20 error: "struct with typedef name for linkage" has member functions
    typedef struct { void f() {} } C_Incompatible;
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 576](<https://cplusplus.github.io/CWG/issues/576.html>) | C++98 | typedef não era permitido em toda a definição de função | permitido no corpo da função
[CWG 2071](<https://cplusplus.github.io/CWG/issues/2071.html>) | C++98 | typedef podia aparecer em uma declaração que não continha um declarador | agora não permitido

### Ver também

*   [Alias de tipo](<#/doc/language/type_alias>)
*   [Template de alias](<#/doc/language/type_alias>)

[Documentação C](<#/>) para declaração Typedef
---