# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::view

```cpp
std::basic_string_view<CharT, Traits> view() const noexcept;  // (desde C++20)
```

  
Cria e retorna um [std::basic_string_view](<#/doc/string/basic_string_view>) sobre a sequência de caracteres subjacente.

  * Para streams somente de entrada, o view retornado representa o range [eback(), egptr()).
  * Para streams de entrada/saída ou somente de saída, referencia os caracteres de pbase() até o último caractere na sequência, independentemente de egptr() e epptr().
  * Se o stream não for nem de entrada nem de saída, retorna [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>{}.

A sequência de caracteres membro em um buffer aberto para escrita pode ser superalocada para fins de eficiência. Nesse caso, apenas os _caracteres inicializados_ são referenciados: esses caracteres são aqueles que foram obtidos do argumento string do construtor, do argumento string usado pela chamada mais recente a uma sobrecarga setter de `str()`, ou de uma operação de escrita. Uma implementação típica que usa superalocação mantém um ponteiro de marca d'água alta (high-watermark pointer) para rastrear o fim da parte inicializada do buffer e o view retornado referencia os caracteres de pbase() até o ponteiro de marca d'água alta.

### Parâmetros

(nenhum)

### Valor de retorno

Um view sobre a sequência de caracteres subjacente.

### Observações

O uso do valor de retorno é comportamento indefinido se a sequência de caracteres subjacente for destruída ou invalidada, a menos que o valor de retorno esteja vazio.

Esta função é tipicamente acessada através de std::basic_istringstream::view(), std::basic_ostringstream::view(), ou std::basic_stringstream::view().

### Veja também

[ str](<#/doc/io/basic_stringbuf/str>) |  substitui ou obtém uma cópia da string de caracteres associada   
(função membro pública)  
[ operator basic_string_view](<#/doc/string/basic_string/operator_basic_string_view>)(C++17) |  retorna um `basic_string_view` não modificável da string inteira   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)