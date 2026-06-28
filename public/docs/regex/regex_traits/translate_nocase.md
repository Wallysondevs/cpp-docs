# std::regex_traits&lt;CharT&gt;::translate_nocase

CharT translate_nocase( CharT c ) const;

  
Obtém a chave de comparação para o caractere `c`, de modo que todos os caracteres que são equivalentes a este caractere na `locale` imbuída, ignorando as diferenças de maiúsculas/minúsculas, se houver, produzam a mesma chave.

Quando a biblioteca regex precisa comparar dois caracteres `c1` e `c2` e a flag [std::regex_constants::icase](<#/doc/regex/syntax_option_type>) é `true`, ela executa `regex_traits<>::translate_nocase(c1) == regex_traits<>::translate_nocase(c2)`.

Especializações da `standard library` de [std::regex_traits](<#/doc/regex/regex_traits>) retornam [std::use_facet](<#/doc/locale/use_facet>)<[std::ctype](<#/doc/locale/ctype>)&lt;CharT&gt;>(getloc()).tolower(c), ou seja, convertem `c` para minúscula, usando a `locale` atualmente imbuída.

### Parâmetros

c  |  \-  |  caractere que precisa ser examinado para equivalência, ignorando maiúsculas/minúsculas   
  
### Valor de retorno

A chave de comparação sem distinção de maiúsculas/minúsculas para `c` na `locale` atualmente imbuída.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   