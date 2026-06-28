# Endereço de uma função sobrecarregada

Além das [expressões de chamada de função](<#/doc/language/operator_other>), onde ocorre a [resolução de sobrecarga](<#/doc/language/overload_resolution>), o nome de uma função sobrecarregada pode aparecer nos 7 contextos a seguir:

Contexto | Alvo
---|---
[inicializador](<#/doc/language/initialization>) em uma [declaração](<#/doc/language/declarations>) de um objeto ou [referência](<#/doc/language/reference_initialization>) | o objeto ou referência sendo inicializado
no lado direito de uma expressão de atribuição | o lado esquerdo da atribuição
como um argumento de chamada de função | o parâmetro da função
como um argumento de operador definido pelo usuário | o parâmetro do operador
a instrução [`return`](<#/doc/language/return>) | o valor de retorno de uma função ou conversão
argumento de [conversão explícita](<#/doc/language/explicit_cast>) ou [`static_cast`](<#/doc/language/static_cast>) | a conversão correspondente
argumento de [template](<#/doc/language/template_parameters>) não-tipo | o parâmetro de template correspondente

Em cada contexto, o nome de uma função sobrecarregada pode ser precedido pelo operador de endereço `&` e pode ser envolvido por um conjunto redundante de parênteses.

Se o tipo alvo contiver um [tipo placeholder](<#/doc/language/auto>), a dedução de tipo placeholder é realizada, e a descrição a seguir usa o tipo deduzido como tipo alvo. | (desde C++26)

### Selecionando funções

Quando o endereço de uma função sobrecarregada é tomado, um conjunto `S` de funções é selecionado do conjunto de sobrecarga referido pelo nome da função sobrecarregada:

  * Se não houver alvo, todas as funções não-template nomeadas são selecionadas.
  * Caso contrário, uma função não-template com tipo `F` é selecionada para o tipo de função `FT` do tipo alvo se `F` (após possivelmente aplicar a [conversão de ponteiro de função](<#/doc/language/implicit_cast>))(desde C++17) for idêntico a `FT`.[1](<#/doc/language/overloaded_address>)
  * A especialização (se houver) gerada pela [dedução de argumento de template](<#/doc/language/template_argument_deduction>) para cada template de função nomeado também é adicionada a `S`.

Se o alvo for do tipo ponteiro de função ou referência a tipo de função, `S` pode incluir apenas funções não-membro, funções membro de objeto explícitas(desde C++23) e funções membro estáticas. Se o alvo for do tipo ponteiro para função membro, `S` pode incluir apenas funções membro de objeto implícitas.

  1. [↑](<#/doc/language/overloaded_address>) Em outras palavras, a classe da qual a função é membro é ignorada se o tipo alvo for um tipo ponteiro para função membro.

### Eliminando funções

Após formar o conjunto `S`, as funções são eliminadas na seguinte ordem:

  * Todas as funções com [restrições](<#/doc/language/constraints>) associadas que não são satisfeitas são eliminadas de `S`.

| (desde C++20)

  * Se mais de uma função em `S` permanecer, todas as especializações de template de função em `S` são eliminadas se `S` também contiver uma função não-template.

  * Qualquer função não-template `func` é eliminada se `S` contiver uma segunda função não-template que seja [mais restrita por ordenação parcial](<#/doc/language/constraints>) do que `func`.

| (desde C++20)

  * Qualquer especialização de template de função `spec` é eliminada se `S` contiver uma segunda especialização de template de função cujo template de função seja [mais especializado](<#/doc/language/function_template>) do que o template de função de `spec`.

Após tais eliminações (se houver), exatamente uma função selecionada deve permanecer em `S`. Caso contrário, o programa é malformado.

### Exemplo

Execute este código
```cpp
    int f(int) { return 1; }
    int f(double) { return 2; }
    
    void g(int(&f1)(int), int(*f2)(double)) { f1(0); f2(0.0); }
    
    template<int(*F)(int)>
    struct Templ {};
    
    struct Foo
    {
        int mf(int) { return 3; }
        int mf(double) { return 4; }
    };
    
    struct Emp
    {
        void operator<<(int (*)(double)) {}
    };
    
    int main()
    {
        // 1. inicialização
        int (*pf)(double) = f; // seleciona int f(double)
        int (&rf)(int) = f; // seleciona int f(int)
        int (Foo::*mpf)(int) = &Foo::mf; // seleciona int mf(int)
    
        // 2. atribuição
        pf = nullptr;
        pf = &f; // seleciona int f(double)
    
        // 3. argumento de função
        g(f, f); // seleciona int f(int) para o 1º argumento
                 // e int f(double) para o segundo
    
        // 4. operador definido pelo usuário
        Emp{} << f; //seleciona int f(double)
    
        // 5. valor de retorno
        auto foo =  -> int (*)(int)
        {
            return f; // seleciona int f(int)
        };
    
        // 6. conversão
        auto p = static_cast<int(*)(int)>(f); // seleciona int f(int)
    
        // 7. argumento de template
        Templ<f> t;  // seleciona int f(int)
    
        // previne avisos de "variável não utilizada" como se por [[maybe_unused]]
        {}(pf, rf, mpf, foo, p, t);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 202](<https://cplusplus.github.io/CWG/issues/202.html>) | C++98 | argumento de template não-tipo não era um contexto de tomar o endereço de uma função sobrecarregada | é
[CWG 250](<https://cplusplus.github.io/CWG/issues/250.html>) | C++98 | especializações de template de função geradas com argumentos de template não-deduzidos não eram selecionadas do conjunto de sobrecarga | também selecionadas
[CWG 1153](<https://cplusplus.github.io/CWG/issues/1153.html>) | C++98 | não estava claro se um dado tipo de função correspondia ao tipo alvo | esclarecido
[CWG 1563](<https://cplusplus.github.io/CWG/issues/1563.html>) | C++11 | não estava claro se a inicialização por lista é um contexto de tomar o endereço de uma função sobrecarregada | esclarecido

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 12.3 Endereço de função sobrecarregada [over.over]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 12.5 Endereço de função sobrecarregada [over.over]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 16.4 Endereço de função sobrecarregada [over.over]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 13.4 Endereço de função sobrecarregada [over.over]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 13.4 Endereço de função sobrecarregada [over.over]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 13.4 Endereço de função sobrecarregada [over.over]
