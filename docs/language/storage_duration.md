# Especificadores de classe de armazenamento

Os especificadores de classe de armazenamento fazem parte da decl-specifier-seq da [sintaxe de declaração](<#/doc/language/declarations>) de um nome. Juntamente com o [escopo](<#/doc/language/scope>) do nome, eles controlam duas propriedades independentes do nome: sua _duração de armazenamento_ e sua _ligação_.

### Duração de armazenamento

A _duração de armazenamento_ é a propriedade de um [objeto](<#/doc/language/objects>) que define o tempo de vida potencial mínimo do armazenamento que contém o objeto. A duração de armazenamento é determinada pela construção usada para criar o objeto e é uma das seguintes:

  * duração de armazenamento estática

  * duração de armazenamento de thread

| (desde C++11)
  
  * duração de armazenamento automática
  * duração de armazenamento dinâmica

As durações de armazenamento estática, de thread (desde C++11) e automática estão associadas a objetos introduzidos por [declarações](<#/doc/language/declarations>) e a [objetos temporários](<#/doc/language/lifetime>). A duração de armazenamento dinâmica está associada a objetos criados por uma [expressão new](<#/doc/language/new>) ou a [objetos criados implicitamente](<#/doc/language/objects>).

As categorias de duração de armazenamento também se aplicam a referências.

A duração de armazenamento de [subobjetos](<#/doc/language/objects>) e membros de referência é a de seu objeto completo.

#### Especificadores

As seguintes palavras-chave são _especificadores de classe de armazenamento_ ﻿:

  * auto

| (até C++11)
  
  * register

| (até C++17)
  
  * static

  * thread_local

| (desde C++11)
  
  * extern
  * mutable

Em uma decl-specifier-seq, pode haver no máximo um especificador de classe de armazenamento, exceto que thread_local pode aparecer com static ou extern (desde C++11).

mutable não tem efeito na duração de armazenamento. Para seu uso, consulte [const/volatile](<#/doc/language/cv>).

Outros especificadores de classe de armazenamento podem aparecer nas decl-specifier-seq ﻿s das seguintes declarações:

Especificador | Pode aparecer nas decl-specifier-seq ﻿s de
Declarações de variável | Declarações de função | Declarações de structured binding
(desde C++17)
Não-membro | Membro | Não-membro | Membro Não-parâmetro | Parâmetro de função | Não-estático | Estático | Não-estático | Estático auto | Apenas escopo de bloco | Sim | Não | Não | Não | Não | Não | N/A
---|---|---|---|---|---|---|---|---
register | Apenas escopo de bloco | Sim | Não | Não | Não | Não | Não | N/A
static | Sim | Não | Declara estático | Apenas escopo de namespace | Declara estático | Sim
thread_local | Sim | Não | Não | Sim | Não | Não | Não | Sim
extern | Sim | Não | Não | Não | Sim | Não | Não | Não

[Unions anônimas](<#/doc/language/union>) também podem ser declaradas com static.

register é uma dica de que a variável assim declarada será muito usada, para que seu valor possa ser armazenado em um registrador da CPU. A dica pode ser ignorada, e na maioria das implementações será ignorada se o endereço da variável for obtido. Este uso está depreciado. | (até C++17)
  
#### Duração de armazenamento estática

Uma variável que satisfaz todas as condições a seguir tem _duração de armazenamento estática_ ﻿:

  * Ela pertence a um [escopo de namespace](<#/doc/language/scope>) ou é declarada pela primeira vez com static ou extern.

  * Ela não tem duração de armazenamento de thread.

| (desde C++11)
  
O armazenamento para essas entidades dura pela duração do programa.

#### Duração de armazenamento de thread

Todas as variáveis declaradas com thread_local têm _duração de armazenamento de thread_. O armazenamento para essas entidades dura pela duração da thread na qual são criadas. Existe um objeto ou referência distinto por thread, e o uso do nome declarado refere-se à entidade associada à thread atual. | (desde C++11)
  
#### Duração de armazenamento automática

As seguintes variáveis têm _duração de armazenamento automática_ ﻿:

  * Variáveis que pertencem a um [escopo de bloco](<#/doc/language/scope>) e não são explicitamente declaradas static, thread_local (desde C++11) ou extern. O armazenamento para tais variáveis dura até que o bloco em que são criadas seja encerrado.
  * Variáveis que pertencem a um escopo de parâmetro (ou seja, parâmetros de função). O armazenamento para um parâmetro de função dura até imediatamente após sua [destruição](<#/doc/language/operator_other>).

#### Duração de armazenamento dinâmica

Objetos criados pelos seguintes métodos durante a execução do programa têm _duração de armazenamento dinâmica_ ﻿:

  * [expressões new](<#/doc/language/new>). O armazenamento para tais objetos é alocado por [funções de alocação](<#/doc/memory/new/operator_new>) e desalocado por [funções de desalocação](<#/doc/memory/new/operator_delete>).
  * [Criação implícita](<#/doc/language/objects>) por outros meios. O armazenamento para tais objetos se sobrepõe a algum armazenamento existente.
  * [Objetos de exceção](<#/doc/language/throw>). O armazenamento para tais objetos é alocado e desalocado de uma maneira não especificada.

### Ligação

Um nome pode ter _ligação externa_ ﻿, _ligação de módulo_ (desde C++20), _ligação interna_ ou _nenhuma ligação_ :

  * Uma entidade cujo nome tem ligação externa pode ser [redeclarada](<#/doc/language/conflicting_declarations>) em outra [unidade de tradução](<#/doc/language/translation_phases>), e a redeclaração pode ser [anexada a um módulo diferente](<#/doc/language/modules>) (desde C++20).

  * Uma entidade cujo nome tem ligação de módulo pode ser redeclarada em outra unidade de tradução, desde que a redeclaração esteja anexada ao mesmo módulo.

| (desde C++20)
  
  * Uma entidade cujo nome tem ligação interna pode ser redeclarada em outro escopo na mesma unidade de tradução.
  * Uma entidade cujo nome não tem ligação só pode ser redeclarada no mesmo escopo.

As seguintes ligações são reconhecidas:

#### Nenhuma ligação

Qualquer um dos seguintes nomes declarados no escopo de bloco não tem ligação:

  * variáveis que não são explicitamente declaradas extern (independentemente do modificador static);
  * [classes locais](<#/doc/language/class>) e suas funções membro;
  * outros nomes declarados no escopo de bloco, como typedefs, enumerações e enumeradores.

Nomes não especificados com ligação externa, de módulo (desde C++20) ou interna também não têm ligação, independentemente do escopo em que são declarados.

#### Ligação interna

Qualquer um dos seguintes nomes declarados no escopo de namespace tem ligação interna:

  * variáveis, templates de variável (desde C++14), funções ou templates de função declarados static;
  * variáveis não-template (desde C++14) de tipo qualificado const não-volátil, a menos que

    

  * elas sejam inline,

| (desde C++17)
  
    

  * elas sejam declaradas no âmbito de uma [unidade de interface de módulo](<#/doc/language/modules>) (fora do [fragmento de módulo privado](<#/doc/language/modules>), se houver) ou [partição de módulo](<#/doc/language/modules>),

| (desde C++20)
  
    

  * elas sejam explicitamente declaradas extern, ou
  * elas foram declaradas anteriormente e a declaração anterior não tinha ligação interna;

  * membros de dados de [unions anônimas](<#/doc/language/union>).

Além disso, todos os nomes declarados em [namespaces sem nome](<#/doc/language/namespace>) ou em um namespace dentro de um namespace sem nome, mesmo aqueles explicitamente declarados extern, têm ligação interna. | (desde C++11)
  
#### Ligação externa

Variáveis e funções com ligação externa também têm [ligação de linguagem](<#/doc/language/language_linkage>), o que torna possível ligar unidades de tradução escritas em diferentes linguagens de programação.

Qualquer um dos seguintes nomes declarados no escopo de namespace tem ligação externa, a menos que sejam declarados em um namespace sem nome ou suas declarações estejam anexadas a um módulo nomeado e não sejam exportadas (desde C++20):

  * variáveis e funções não listadas acima (ou seja, funções não declaradas static, variáveis não-const não declaradas static, e quaisquer variáveis declaradas extern);
  * enumerações;
  * nomes de classes, suas funções membro, membros de dados static (const ou não), classes e enumerações aninhadas, e funções introduzidas pela primeira vez com declarações [friend](<#/doc/language/friend>) dentro de corpos de classe;
  * nomes de todos os templates não listados acima (ou seja, não templates de função declarados static).

Qualquer um dos seguintes nomes declarados pela primeira vez no escopo de bloco tem ligação externa:

  * nomes de variáveis declaradas extern;
  * nomes de funções.

#### Ligação de módulo

Nomes declarados no escopo de namespace têm ligação de módulo se suas declarações estiverem anexadas a um módulo nomeado e não forem exportadas, e não tiverem ligação interna. | (desde C++20)
---|---
| Esta seção está incompleta
Razão: adicionar a descrição do comportamento quando uma entidade é declarada com diferentes ligações na mesma unidade de tradução (6.6 parágrafo 6), observar a diferença entre C++20 (malformado) e o rascunho atual (bem-formado)
  
### Variáveis de bloco estáticas

Variáveis de bloco com duração de armazenamento static ou de thread (desde C++11) são inicializadas na primeira vez que o controle passa por sua declaração (a menos que sua inicialização seja [zero-](<#/doc/language/zero_initialization>) ou [inicialização constante](<#/doc/language/constant_initialization>), que pode ser realizada antes que o bloco seja inserido pela primeira vez). Em todas as chamadas subsequentes, a declaração é ignorada.

  * Se a inicialização [lançar uma exceção](<#/doc/language/throw>), a variável não é considerada inicializada, e a inicialização será tentada novamente na próxima vez que o controle passar pela declaração.
  * Se a inicialização entrar recursivamente no bloco em que a variável está sendo inicializada, o comportamento é indefinido.

  * Se múltiplas threads tentarem inicializar a mesma variável local static concorrentemente, a inicialização ocorre exatamente uma vez (comportamento similar pode ser obtido para funções arbitrárias com [std::call_once](<#/doc/thread/call_once>)).

    

  * Implementações usuais deste recurso usam variantes do padrão de bloqueio de dupla verificação (double-checked locking), o que reduz a sobrecarga de tempo de execução para estáticos locais já inicializados a uma única comparação booleana não atômica.

| (desde C++11)
  
O destrutor para uma variável de bloco com duração de armazenamento estática [é chamado na saída do programa](<#/doc/utility/program/exit>), mas somente se a inicialização ocorreu com sucesso.

Variáveis com duração de armazenamento estática em todas as definições da mesma [função inline](<#/doc/language/inline>) (que pode ser implicitamente inline) todas se referem ao mesmo objeto definido em uma unidade de tradução, desde que a função tenha ligação externa.

### Entidades locais da unidade de tradução

O conceito de entidades locais da unidade de tradução é padronizado em C++20, veja [esta página](<#/doc/language/tu_local>) para mais detalhes.

Uma entidade é _local da unidade de tradução_ (ou _TU-local_ para abreviar) se

  * ela tem um nome com ligação interna, ou
  * ela não tem um nome com ligação e é introduzida dentro da definição de uma entidade TU-local, ou
  * ela é um template ou especialização de template cujo argumento de template ou declaração de template usa uma entidade TU-local.

Coisas ruins (geralmente violação de [ODR](<#/doc/language/definition>)) podem acontecer se o tipo de uma entidade não-TU-local depender de uma entidade TU-local, ou se uma declaração de, ou um [guia de dedução](<#/doc/language/ctad>) para (desde C++17), uma entidade não-TU-local nomear uma entidade TU-local fora de seu

  * corpo de função para uma função não-inline ou template de função
  * inicializador para uma variável ou template de variável
  * declarações friend em uma definição de classe
  * uso do valor de uma variável, se a variável for [utilizável em expressões constantes](<#/doc/language/constant_expression>)

Tais usos são proibidos em uma [unidade de interface de módulo](<#/doc/language/modules>) (fora de seu fragmento de módulo privado, se houver) ou uma partição de módulo, e são depreciados em qualquer outro contexto. Uma declaração que aparece em uma unidade de tradução não pode nomear uma entidade TU-local declarada em outra unidade de tradução que não seja uma unidade de cabeçalho. Uma declaração instanciada para um [template](<#/doc/language/templates>) aparece no ponto de instanciação da especialização. | (desde C++20)
  
### Notas

Nomes no escopo de namespace de nível superior (escopo de arquivo em C) que são const e não extern têm ligação externa em C, mas ligação interna em C++.

Desde C++11, auto não é mais um especificador de classe de armazenamento; ele é usado para indicar dedução de tipo.

Em C, o endereço de uma variável register não pode ser obtido, mas em C++, uma variável declarada register é semanticamente indistinguível de uma variável declarada sem quaisquer especificadores de classe de armazenamento. | (até C++17)
---|---
Em C++, ao contrário de C, variáveis não podem ser declaradas register. | (desde C++17)
  
Nomes de variáveis thread_local com ligação interna ou externa referenciadas de diferentes escopos podem se referir à mesma ou a diferentes instâncias, dependendo se o código está sendo executado na mesma ou em diferentes threads.

A palavra-chave extern também pode ser usada para especificar [ligação de linguagem](<#/doc/language/language_linkage>) e [declarações de instanciação explícita de template](<#/doc/language/class_template>), mas não é um especificador de classe de armazenamento nesses casos (exceto quando uma declaração está diretamente contida em uma especificação de ligação de linguagem, caso em que a declaração é tratada como se contivesse o especificador extern).

Especificadores de classe de armazenamento, exceto thread_local, não são permitidos em [especializações explícitas](<#/doc/language/template_specialization>) e [instanciações explícitas](<#/doc/language/class_template>):
```cpp
    template<class T>
    struct S
    {
        thread_local static int tlm;
    };
    
    template<>
    thread_local int S<float>::tlm = 0; // "static" does not appear here
```

```cpp
Um template de variável const (pode ser implícito por constexpr) costumava ter ligação interna por padrão, o que era inconsistente com outras entidades templated. O relatório de defeito CWG2387 corrigiu isso.  // (desde C++14)
`inline` atua como uma solução alternativa para CWG2387 ao fornecer ligação externa por padrão. É por isso que o inline foi adicionado a muitos templates de variável e depois removido após a aceitação do CWG2387. As implementações da biblioteca padrão também precisam usar inline enquanto um compilador suportado não tiver o CWG2387 implementado. Veja GCC Bugzilla #109126 e MSVC STL PR #4546.  // (desde C++17)
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_threadsafe_static_init` | `200806L` | (C++11) | Inicialização e destruição dinâmica com concorrência
```
  
### Palavras-chave

[`auto`](<#/doc/keyword/auto>), [`register`](<#/doc/keyword/register>), [`static`](<#/doc/keywords/static>), [`extern`](<#/doc/keyword/extern>), [`thread_local`](<#/doc/keyword/thread_local>), [`mutable`](<#/doc/keyword/mutable>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <mutex>
    #include <string>
    #include <thread>
    
    thread_local unsigned int rage = 1;
    std::mutex cout_mutex;
    
    void increase_rage(const std::string& thread_name)
    {
        ++rage; // modifying outside a lock is okay; this is a thread-local variable
        std::lock_guard<std::mutex> lock(cout_mutex);
        std::cout << "Rage counter for " << thread_name << ": " << rage << '\n';
    }
    
    int main()
    {
        std::thread a(increase_rage, "a"), b(increase_rage, "b");
    
        {
            std::lock_guard<std::mutex> lock(cout_mutex);
            std::cout << "Rage counter for main: " << rage << '\n';
        }
    
        a.join();
        b.join();
    }
```

Saída possível:
```
    Rage counter for a: 2
    Rage counter for main: 1
    Rage counter for b: 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 216](<https://cplusplus.github.io/CWG/issues/216.html>) | C++98 | classe e enumeração sem nome no escopo de classe têm ligação diferente daquelas no escopo de namespace | todas elas têm ligação externa nesses escopos
[CWG 389](<https://cplusplus.github.io/CWG/issues/389.html>) | C++98 | um nome sem ligação não deve ser usado para declarar uma entidade com ligação | um tipo sem ligação não deve ser usado como o tipo de uma variável ou função com ligação, a menos que a variável ou função tenha ligação de linguagem C
[CWG 426](<https://cplusplus.github.io/CWG/issues/426.html>) | C++98 | uma entidade poderia ser declarada com ligação interna e externa na mesma unidade de tradução | o programa é malformado neste caso
[CWG 527](<https://cplusplus.github.io/CWG/issues/527.html>) | C++98 | a restrição de tipo introduzida pela resolução do CWG 389 também foi aplicada a variáveis e funções que não podem ser nomeadas fora de suas próprias unidades de tradução | a restrição é levantada para essas variáveis e funções (ou seja, sem ligação ou ligação interna, ou declaradas dentro de namespaces sem nome)
[CWG 809](<https://cplusplus.github.io/CWG/issues/809.html>) | C++98 | register servia para muito pouca função | depreciado
[CWG 1648](<https://cplusplus.github.io/CWG/issues/1648.html>) | C++11 | static era implícito mesmo se thread_local fosse combinado com extern | implícito apenas se nenhum outro especificador de classe de armazenamento estiver presente
[CWG 1686](<https://cplusplus.github.io/CWG/issues/1686.html>) | C++98
C++11 | o nome de uma variável não-static declarada no escopo de namespace tinha ligação interna apenas se fosse explicitamente declarada const (C++98) ou constexpr (C++11) | apenas exigia que o tipo fosse qualificado como const
[CWG 2019](<https://cplusplus.github.io/CWG/issues/2019.html>) | C++98 | a duração de armazenamento de membros de referência era não especificada | o mesmo que seu objeto completo
[CWG 2387](<https://cplusplus.github.io/CWG/issues/2387.html>) | C++14 | não estava claro se template de variável qualificado como const tinha ligação interna por padrão | o qualificador const não afeta a ligação de templates de variável ou suas instâncias
[CWG 2533](<https://cplusplus.github.io/CWG/issues/2533.html>) | C++98 | a duração de armazenamento de objetos criados implicitamente era incerta | esclarecido
[CWG 2850](<https://cplusplus.github.io/CWG/issues/2850.html>) | C++98 | não estava claro quando o armazenamento para parâmetros de função era desalocado | esclarecido
[CWG 2872](<https://cplusplus.github.io/CWG/issues/2872.html>) | C++98 | o significado de “pode ser referenciado” era incerto | redação melhorada
[P2788R0](<https://wg21.link/P2788R0>) | C++20 | declarar uma variável qualificada como const em um namespace dava a ela ligação interna mesmo em uma unidade de módulo | ligação interna não é dada
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 6.7.5 Duração de armazenamento [basic.stc]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 6.7.5 Duração de armazenamento [basic.stc]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 6.7 Duração de armazenamento [basic.stc]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 3.7 Duração de armazenamento [basic.stc]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 3.7 Duração de armazenamento [basic.stc]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 3.7 Duração de armazenamento [basic.stc]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 3.7 Duração de armazenamento [basic.stc]

### Veja também

[Documentação C](<#/>) para duração de armazenamento
---