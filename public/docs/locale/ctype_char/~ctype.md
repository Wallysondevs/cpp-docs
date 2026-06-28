# std::ctype&lt;char&gt;::~ctype

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~ctype();
```

  
Destrói um facet [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;. Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/>) ser virtual). Um objeto do tipo [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;, como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::ctype](<#/doc/locale/ctype>)&lt;char&gt; e implementa um destrutor público. 

Se, quando esta instância de [std::ctype](<#/doc/locale/ctype>)&lt;char&gt; foi construída, uma tabela de classificação personalizada foi fornecida e o segundo argumento para o construtor (o booleano `del`) era `true`, então este destrutor executa `delete[] table()`.