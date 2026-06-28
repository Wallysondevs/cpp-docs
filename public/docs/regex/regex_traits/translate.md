# std::regex_traits&lt;CharT&gt;::translate

CharT translate( CharT c ) const;

  
Obtém a chave de comparação para o caractere c, de modo que todos os caracteres equivalentes a este caractere na locale imbuída produzam a mesma chave.

Quando a biblioteca regex precisa comparar dois caracteres `c1` e `c2` e a flag [std::regex_constants::collate](<#/doc/regex/syntax_option_type>) for verdadeira, ela executa regex_traits<>::translate(c1) == regex_traits<>::translate(c2).

Especializações da standard library de [std::regex_traits](<#/doc/regex/regex_traits>) retornam c sem modificação.

### Parâmetros

c  |  \-  |  caractere que precisa ser examinado para equivalência   
  
### Valor de retorno

A chave de comparação para c na locale atualmente imbuída.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   