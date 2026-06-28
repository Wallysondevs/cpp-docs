# std::basic_ispanstream&lt;CharT,Traits&gt;::operator=

```cpp
basic_ispanstream& operator=( basic_ispanstream&& other );  // (1) (desde C++23)
basic_ispanstream& operator=( const basic_ispanstream& ) = delete;  // (2) (desde C++23)
```

  
1) Atribui `other` a `*this` por movimento, efetivamente atribuindo por movimento tanto o subobjeto da classe base [std::basic_istream](<#/doc/io/basic_istream>) quanto o std::basic_spanbuf encapsulado.

2) O operador de atribuição por cópia é deletado. `basic_ispanstream` não é atribuível por cópia.

Note que o operador de atribuição por movimento da classe base troca todas as variáveis de estado do stream (exceto por [`rdbuf()`](<#/doc/io/basic_ispanstream/rdbuf>)) entre `*this` e `other`.

É definido pela implementação se o std::basic_spanbuf encapsulado em `other` ainda mantém um buffer subjacente após a atribuição por movimento.

### Parâmetros

other  |  \-  |  outro stream para mover de   
  
### Valor de retorno

`*this`

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator=](<#/>) |  atribui um objeto `basic_spanbuf`   
(função membro pública de `std::basic_spanbuf<CharT,Traits>`)  
[ operator=](<#/>)(C++11) |  atribui por movimento de outro `basic_istream`   
(função membro protegida)