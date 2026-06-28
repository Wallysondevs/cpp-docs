# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::filesystem::path)

```cpp
friend bool operator==( const path& lhs, const path& rhs ) noexcept;  // (1) (desde C++17)
friend bool operator!=( const path& lhs, const path& rhs ) noexcept;  // (2) (desde C++17)
(ate C++20)
friend bool operator<( const path& lhs, const path& rhs ) noexcept;  // (3) (desde C++17)
(ate C++20)
friend bool operator<=( const path& lhs, const path& rhs ) noexcept;  // (4) (desde C++17)
(ate C++20)
friend bool operator>( const path& lhs, const path& rhs ) noexcept;  // (5) (desde C++17)
(ate C++20)
friend bool operator>=( const path& lhs, const path& rhs ) noexcept;  // (6) (desde C++17)
(ate C++20)
friend std::strong_ordering
operator<=>( const path& lhs, const path& rhs ) noexcept;  // (7) (desde C++20)
```

  
Compara dois paths lexicograficamente.

1) Verifica se lhs e rhs são iguais. Equivalente a !(lhs < rhs) && !(rhs < lhs).

2) Verifica se lhs e rhs não são iguais. Equivalente a !(lhs == rhs).

3) Verifica se lhs é menor que rhs. Equivalente a lhs.compare(rhs) < 0.

4) Verifica se lhs é menor ou igual a rhs. Equivalente a !(rhs < lhs).

5) Verifica se lhs é maior que rhs. Equivalente a rhs < lhs.

6) Verifica se lhs é maior ou igual a rhs. Equivalente a !(lhs < rhs).

7) Obtém o resultado da comparação de três vias de lhs e rhs. Equivalente a lhs.compare(rhs) <=> 0.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando std::filesystem::path é uma classe associada dos argumentos. Isso evita conversões indesejáveis na presença de uma _using-directive_ `using namespace std::filesystem;`.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator== respectivamente.  // (desde C++20)
```
  
### Parâmetros

lhs, rhs  |  \-  |  os paths a comparar   
  
### Valor de retorno

1-6) true se a comparação correspondente for verdadeira, false caso contrário.

7) std::strong_ordering::less se lhs for menor que rhs, caso contrário std::strong_ordering::greater se rhs for menor que lhs, caso contrário std::strong_ordering::equal.

### Observações

Igualdade e equivalência de path têm semânticas diferentes.

No caso de igualdade, conforme determinado por `operator==`, apenas representações lexicais são comparadas. Portanto, `path("a") == path("b")` nunca é true.

No caso de equivalência, conforme determinado por [std::filesystem::equivalent()](<#/doc/filesystem/equivalent>), é verificado se dois paths _resolvem_ para o mesmo objeto do sistema de arquivos. Assim, `equivalent("a", "b")` retornará true se os paths resolverem para o mesmo arquivo.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3065](<https://cplusplus.github.io/LWG/issue3065>) | C++17  | permitia a comparação de tudo conversível para `path` na presença de uma _using-directive_ | tornou-se hidden friend   
  
### Veja também

[ compare](<#/doc/filesystem/path/compare>) |  compara as representações lexicais de dois paths lexicograficamente   
(função membro pública)  
[ equivalent](<#/doc/filesystem/equivalent>)(C++17) |  verifica se dois paths se referem ao mesmo objeto do sistema de arquivos   
(função)