# std::locale::operator==, operator!=

```cpp
bool operator==( const locale& other ) const;  // (1)
bool operator!=( const locale& other ) const;  // (2) (até C++20)
```

  
Testa duas locales quanto à igualdade. Locales nomeadas são consideradas iguais se seus nomes forem iguais. Locales sem nome são consideradas iguais se forem cópias uma da outra. 

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

other  |  \-  |  um objeto [std::locale](<#/doc/locale/locale>) para comparar   
  
### Valor de retorno

1) true se other for uma cópia de *this ou tiver um nome idêntico, false caso contrário.

2) false se other for uma cópia de *this ou tiver um nome idêntico, true caso contrário.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ (construtor)](<#/doc/locale/locale/locale>) |  constrói uma nova locale   
(função membro pública)  
[ name](<#/doc/locale/locale/name>) |  retorna o nome da locale ou "*" se sem nome   
(função membro pública)