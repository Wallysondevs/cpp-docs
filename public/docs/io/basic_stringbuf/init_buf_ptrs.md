# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::init_buf_ptrs

```cpp
`void init_buf_ptrs();`  // (apenas para exposição*)
```

Inicializa as sequências de entrada e saída a partir de `buf` de acordo com `mode`. `buf` e `mode` são [membros de dados apenas para exposição](<#/doc/io/basic_stringbuf>) de `*this`.

Imediatamente após o retorno desta função:

  * Se [std::ios_base::out](<#/doc/io/ios_base/openmode>) estiver definido em `mode`, [`pbase()`](<#/doc/io/basic_streambuf/pptr>) aponta para `buf.front()` e `epptr() >= pbase() + buf.size()` é verdadeiro;
    * além disso, se [std::ios_base::ate](<#/doc/io/ios_base/openmode>) estiver definido em `mode`, `pptr() == pbase() + buf.size()` é verdadeiro,
    * caso contrário, `pptr() == pbase()` é verdadeiro.
  * Se [std::ios_base::in](<#/doc/io/ios_base/openmode>) estiver definido em `mode`, [`eback()`](<#/doc/io/basic_streambuf/gptr>) aponta para `buf.front()`, e `gptr() == eback() && egptr() == eback() + buf.size()` é verdadeiro.

### Notas

Por razões de eficiência, operações de stream buffer podem violar invariantes de `buf` enquanto ele está encapsulado em `std::basic_stringbuf`, por exemplo, escrevendo em caracteres no range `[`buf.data() + buf.size()`, `buf.data() + buf.capacity()`)`.

Todas as operações que recuperam um [std::basic_string](<#/doc/string/basic_string>) de `buf` garantem que os invariantes de [std::basic_string](<#/doc/string/basic_string>) sejam mantidos no valor retornado.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 1448](<https://cplusplus.github.io/LWG/issue1448>) | C++98 | chamar `_init_buf_ptrs_()` fazia `pptr() == pbase() + buf.data()` para streams que são tanto de entrada quanto de saída | faz `pptr() == pbase() + buf.size()` para append streams