# std::regex_traits&lt;CharT&gt;::transform

template< class ForwardIt >  
string_type transform( ForwardIt first, ForwardIt last) const;

  
Obtém a chave de ordenação para a sequência de caracteres `[`first`, `last`)`, de tal forma que, se uma chave de ordenação for menor que outra chave de ordenação com o operador<, então a sequência de caracteres que produziu a primeira chave de ordenação virá antes da sequência de caracteres que produziu a segunda chave de ordenação, na ordem de agrupamento da locale atualmente imbuída.

Por exemplo, quando a flag de regex [std::regex_constants::collate](<#/doc/regex/syntax_option_type>) está definida, então a sequência `[a-b]` corresponderia a algum caractere `c1` se traits.transform("a") <= traits.transform(c1) <= traits.transform("b"). Note que esta função aceita uma sequência de caracteres como argumento para acomodar ranges definidos como [[.ae.]-d].

Especializações da standard library de [std::regex_traits](<#/doc/regex/regex_traits>) retornam [std::use_facet](<#/doc/locale/use_facet>)<[std::collate](<#/doc/locale/collate>)&lt;CharT&gt;>(getloc()).transform(str.data(), str.data() + str.length()) para alguma string temporária `str` construída como string_type str(first, last).

### Parâmetros

first, last  |  \-  |  um par de [LegacyForwardIterators](<#/doc/named_req/ForwardIterator>) que determina a sequência de caracteres a comparar   
Requisitos de tipo   
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).   
  
### Valor de retorno

A chave de agrupamento para a sequência de caracteres `[`first`, `last`)` na locale atualmente imbuída.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   