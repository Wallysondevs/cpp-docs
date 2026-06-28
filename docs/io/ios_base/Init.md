# std::ios_base::Init

class Init;

Esta classe é usada para garantir que os streams C++ padrão ([std::cin](<#/doc/io/cin>), [std::cout](<#/doc/io/cout>), etc.) sejam devidamente inicializados e destruídos. A classe rastreia quantas instâncias dela são criadas e inicializa os streams C++ quando a primeira instância é construída, bem como descarrega os streams de saída quando a última instância é destruída.

O header [`<iostream>`](<#/doc/header/iostream>) se comporta como se definisse (direta ou indiretamente) uma instância de `std::ios_base::Init` com duração de armazenamento estática: isso torna seguro acessar os streams de E/S padrão nos construtores e destrutores de objetos estáticos com [inicialização ordenada](<#/doc/language/initialization>) (desde que [`<iostream>`](<#/doc/header/iostream>) seja incluído na unidade de tradução antes que esses objetos fossem definidos).

Cada [módulo da biblioteca C++](<#/doc/standard_library>) em uma [implementação hospedada](<#/doc/freestanding>) se comporta como se contivesse uma [unidade de interface](<#/doc/language/modules>) que define uma variável `std::ios_base::Init` [não exportada](<#/doc/language/modules>) com [inicialização ordenada](<#/doc/language/initialization>). Como resultado, a definição dessa variável é ordenada por aparência antes de qualquer declaração que siga o ponto de importação de um módulo da biblioteca C++. A existência de tal definição é inobservável por um programa que não referencia nenhum dos objetos iostream padrão. | (desde C++23)

### Member functions

(construtor) | inicializa os streams C++ padrão se eles ainda não foram criados
(função membro pública)
(destrutor) | descarrega os streams C++ padrão se *this for a última instância a ser destruída
(função membro pública)

### Defect reports

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 1123](<https://cplusplus.github.io/LWG/issue1123>) | C++98 | os comportamentos do construtor e do destrutor dependem de um membro de dados estático `init_cnt` apenas para exposição | removeu a dependência

### See also

[ cinwcin](<#/doc/io/cin>) | lê do stream de entrada C padrão [stdin](<#/doc/io/c/std_streams>)
(objeto global)
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída C padrão [stdout](<#/doc/io/c/std_streams>)
(objeto global)
[ cerrwcerr](<#/doc/io/cerr>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>), sem buffer
(objeto global)
[ clogwclog](<#/doc/io/clog>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>)
(objeto global)