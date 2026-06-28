# std::basic_streambuf&lt;CharT,Traits&gt;::pubimbue, std::basic_streambuf&lt;CharT,Traits&gt;::imbue

```cpp
std::locale pubimbue( const std::locale& loc );  // (1)
protected:
virtual void imbue( const std::locale& loc );  // (2)
```

  
Altera a locale associada.

1) Define `loc` como a locale associada. Chama `imbue(loc)` da classe mais derivada.

2) A versão da classe base desta função não tem efeito. As classes derivadas podem sobrescrever esta função para serem informadas sobre as alterações da locale. A classe derivada pode armazenar em cache a locale e os facets membros entre as chamadas a `imbue()`.

### Parâmetros

loc  |  \-  |  objeto locale a ser associado   
  
### Valor de retorno

1) A locale associada anterior.

2) (nenhum)

### Observações

Dentro da chamada de imbue(), [`getloc()`](<#/doc/io/basic_streambuf/getloc>) retorna a locale anterior.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ getloc](<#/doc/io/basic_streambuf/getloc>) |  obtém uma cópia da locale associada   
(função membro pública)  