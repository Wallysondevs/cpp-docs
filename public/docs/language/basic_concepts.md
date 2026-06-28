# Conceitos básicos

Esta seção fornece definições para a terminologia específica e os conceitos usados ao descrever a linguagem de programação C++.

Um programa C++ é uma sequência de arquivos de texto (tipicamente arquivos header e de código-fonte) que contêm [declarações](<#/doc/language/declarations>). Eles passam por [tradução](<#/doc/language/translation_phases>) para se tornarem um programa executável, que é executado quando a implementação C++ chama sua [função main](<#/doc/language/main_function>).

Certas palavras em um programa C++ têm significado especial, e estas são conhecidas como [palavras-chave](<#/doc/keywords>). Outras podem ser usadas como [identificadores](<#/doc/language/name>). [Comentários](<#/doc/comments>) são ignorados durante a tradução. Programas C++ também contêm [literais](<#/doc/language/expressions>), cujos valores de caracteres são determinados por [conjuntos de caracteres e codificações](<#/doc/language/charset>). Certos caracteres no programa devem ser representados com [sequências de escape](<#/doc/language/escape>).

As _entidades_ de um programa C++ são valores, [objetos](<#/doc/language/objects>), [referências](<#/doc/language/reference>), [structured bindings](<#/doc/language/structured_binding>)(desde C++17), [funções](<#/doc/language/functions>), [enumeradores](<#/doc/language/enum>), [tipos](<#/doc/language/type-id>), membros de classe, [templates](<#/doc/language/templates>), [especializações de template](<#/doc/language/template_specialization>), [packs](<#/doc/language/parameter_pack>)(desde C++11), e [namespaces](<#/doc/language/namespace>). [Macros](<#/doc/preprocessor/replace>) de preprocessor não são entidades C++.

_[Declarações](<#/doc/language/declarations>)_ podem introduzir entidades, associá-las a [nomes](<#/doc/language/name>) e definir suas propriedades. As declarações que definem todas as propriedades necessárias para usar uma entidade são [definições](<#/doc/language/definition>). Um programa deve conter apenas uma definição de qualquer função ou variável não-inline que seja [odr-used](<#/doc/language/definition>).

Definições de funções geralmente incluem sequências de [instruções](<#/doc/language/statements>), algumas das quais incluem [expressões](<#/doc/language/expressions>), que especificam os cálculos a serem realizados pelo programa.

Nomes encontrados em um programa são associados às declarações que os introduziram usando [name lookup](<#/doc/language/lookup>). Cada nome é válido apenas dentro de uma parte do programa chamada seu [escopo](<#/doc/language/scope>). Alguns nomes têm [linkage](<#/doc/language/storage_duration>) que os faz referir-se às mesmas entidades quando aparecem em diferentes escopos ou unidades de tradução.

Cada objeto, referência, função, expressão em C++ é associado a um [tipo](<#/doc/language/type-id>), que pode ser [fundamental](<#/doc/language/types>), composto, ou [definido pelo usuário](<#/doc/language/classes>), completo ou [incompleto](<#/doc/language/incomplete_type>), etc.

Objetos declarados e referências declaradas que não são [membros de dados não-estáticos](<#/doc/language/data_members>) são _variáveis_.

### Veja também

[Documentação C](<#/>) para Conceitos básicos
---