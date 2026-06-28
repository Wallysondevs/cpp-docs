# std::experimental::ostream_joiner&lt;DelimT,CharT,Traits&gt;::ostream_joiner

ostream_joiner( ostream_type& stream, const DelimT& delimiter ); |  (1)  |  (library fundamentals TS v2)  
---|---|---
ostream_joiner( ostream_type& stream, DelimT&& delimiter ); |  (2)  |  (library fundamentals TS v2)  
ostream_joiner( const ostream_joiner& other ) = default; |  (3)  |  (library fundamentals TS v2)   
(declarado implicitamente)  
ostream_joiner( ostream_joiner&& other ) = default; |  (4)  |  (library fundamentals TS v2)   
(declarado implicitamente)  

  
1) Constrói o iterator com o membro privado `ostream_type*` inicializado com [std::addressof](<#/doc/memory/addressof>)(stream), o membro privado `delimiter` inicializado com `delimiter`, e a flag privada de "primeiro elemento" definida como `true`.

2) Constrói o iterator com o membro privado `ostream_type*` inicializado com [std::addressof](<#/doc/memory/addressof>)(stream), o membro privado `delimiter` inicializado com `std::move(delimiter)`, e a flag privada de "primeiro elemento" definida como `true`.

3,4) Construtor de cópia/movimentação declarado implicitamente que constrói por cópia/movimentação os membros privados `stream` (ponteiro), `delimiter` e a flag de "primeiro elemento".

### Parâmetros

stream  |  \-  |  o stream de saída a ser acessado por este iterator   
---|---|---
delimiter  |  \-  |  o delimitador a ser inserido no stream entre duas saídas   
other  |  \-  |  o objeto `ostream_joiner` do qual este objeto será construído por cópia ou movimentação   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   