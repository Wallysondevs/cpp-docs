# Pesquisa de Nome

Pesquisa de nome é o procedimento pelo qual um [nome](<#/doc/language/name>), quando encontrado em um programa, é associado à [declaração](<#/doc/language/declarations>) que o introduziu.

Por exemplo, para compilar [std::cout](<#/doc/io/cout>) << [std::endl](<#/doc/io/manip/endl>);, o compilador executa:

  * pesquisa de nome não qualificada para o nome `std`, que encontra a declaração do namespace `std` no header [`<iostream>`](<#/doc/header/iostream>)
  * pesquisa de nome qualificada para o nome `cout`, que encontra uma declaração de variável no namespace `std`
  * pesquisa de nome qualificada para o nome `endl`, que encontra uma declaração de function template no namespace `std`
  * tanto [pesquisa dependente de argumento](<#/doc/language/adl>) para o nome `operator<<`, que encontra múltiplas declarações de function template no namespace `std`, quanto pesquisa de nome qualificada para o nome std::ostream::operator<<, que encontra múltiplas declarações de função membro na classe [std::ostream](<#/doc/io/basic_ostream>).

Para nomes de funções e function templates, a pesquisa de nome pode associar múltiplas declarações ao mesmo nome e pode obter declarações adicionais da [pesquisa dependente de argumento](<#/doc/language/adl>). A [dedução de argumento de template](<#/doc/language/function_template>) também pode ser aplicada, e o conjunto de declarações é passado para a [resolução de sobrecarga](<#/doc/language/overload_resolution>), que seleciona a declaração que será usada. As regras de [acesso a membros](<#/doc/language/access>), se aplicáveis, são consideradas apenas após a pesquisa de nome e a resolução de sobrecarga.

Para todos os outros nomes (variáveis, namespaces, classes, etc.), a pesquisa de nome pode associar múltiplas declarações apenas se elas declararem a mesma [entidade](<#/doc/language/basic_concepts>), caso contrário, deve produzir uma única declaração para que o programa compile. A pesquisa por um nome em um escopo encontra todas as declarações desse nome, com uma exceção, conhecida como o "struct hack" ou "ocultamento de tipo/não-tipo": Dentro do mesmo escopo, algumas ocorrências de um nome podem se referir a uma declaração de uma classe/struct/union/enum que não é um typedef, enquanto todas as outras ocorrências do mesmo nome ou se referem à mesma variável, membro de dados não estático ou enumerador, ou se referem a nomes de funções ou function templates possivelmente sobrecarregados. Neste caso, não há erro, mas o nome do tipo é ocultado da pesquisa (o código deve usar um [especificador de tipo elaborado](<#/doc/language/elaborated_type_specifier>) para acessá-lo).

### Tipos de pesquisa

Se o nome aparecer imediatamente à direita do operador de resolução de escopo `::` ou possivelmente após `::` seguido pela palavra-chave de desambiguação `template`, veja

  * [Pesquisa de nome qualificada](<#/doc/language/qualified_lookup>)

Caso contrário, veja

  * [Pesquisa de nome não qualificada](<#/doc/language/unqualified_lookup>)

    

  * (que, para nomes de funções, inclui [Pesquisa dependente de argumento](<#/doc/language/adl>))

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto
---|---|---|---
[CWG 2063](<https://cplusplus.github.io/CWG/issues/2063.html>) | C++98  | "struct hack" não se aplicava no escopo de classe (quebra compatibilidade com C)  | aplicado
[CWG 2218](<https://cplusplus.github.io/CWG/issues/2218.html>) | C++98  | a pesquisa por nomes não-função (template) não podia associar múltiplas declarações, mesmo que declarassem a mesma entidade  | permitido

### Veja também

  * [Escopo](<#/doc/language/scope>)
  * [Pesquisa dependente de argumento](<#/doc/language/adl>) (ADL)
  * [Dedução de argumento de template](<#/doc/language/function_template>)
  * [Resolução de sobrecarga](<#/doc/language/overload_resolution>)

[Documentação C](<#/>) para Pesquisa e namespaces
---