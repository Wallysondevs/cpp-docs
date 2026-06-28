# operator&lt;&lt;,&gt;&gt;(std::normal_distribution)

```cpp
template< class CharT, class Traits >
friend std::basic_ostream<CharT,Traits>&
operator<<( std::basic_ostream<CharT,Traits>& ost,
const normal_distribution& d );  // (1) (desde C++11)
template< class CharT, class Traits >
friend std::basic_istream<CharT,Traits>&
operator>>( std::basic_istream<CharT,Traits>& ist,
normal_distribution& d );  // (2) (desde C++11)
```

  
Realiza operações de entrada e saída de stream na distribuição de números pseudoaleatórios d.

1) Escreve uma representação textual dos parâmetros da distribuição e do estado interno para ost como representação textual. Os flags de formatação e o caractere de preenchimento de ost permanecem inalterados.

2) Restaura os parâmetros da distribuição e o estado interno com dados lidos de ist. Os flags de formatação de ist permanecem inalterados. Os dados devem ter sido escritos usando um stream com o mesmo locale, e os mesmos parâmetros de template `CharT` e `Traits`, caso contrário, o comportamento é indefinido. Se uma entrada inválida for encontrada, ist.setstate(std::ios::failbit) é chamado, o que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>). d permanece inalterado nesse caso.

Esses function templates não são visíveis para lookup não qualificado comum ou lookup qualificado, e só podem ser encontrados por argument-dependent lookup quando std::normal_distribution&lt;ResultType&gt; é uma classe associada dos argumentos.

### Parâmetros

ost  |  \-  |  stream de saída para inserir os dados   
---|---|---
ist  |  \-  |  stream de entrada para extrair os dados   
d  |  \-  |  distribuição de números pseudoaleatórios   
  
### Valor de retorno

1) ost

2) ist

### Exceções

1) Pode lançar exceções definidas pela implementação.

2) Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) em caso de entrada inválida.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3519](<https://cplusplus.github.io/LWG/issue3519>) | C++11  | a forma dos operadores de inserção e extração era não especificada  
(poderiam ser hidden friends ou function templates fora da classe)  | especificado para ser hidden friends 