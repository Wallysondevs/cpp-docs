# operator&lt;&lt;,&gt;&gt;(std::discard_block_engine)

```cpp
template< class CharT, class Traits >
friend std::basic_ostream<CharT,Traits>&
operator<<( std::basic_ostream<CharT,Traits>& ost,
discard_block_engine<>& e );  // (1) (desde C++11)
template< class CharT, class Traits >
friend std::basic_istream<CharT,Traits>&
operator>>( std::basic_istream<CharT,Traits>& ist,
discard_block_engine& e );  // (2) (desde C++11)
```

  
1) Serializa o estado interno do adaptador de motor de números pseudoaleatórios como uma sequência de números decimais separados por um ou mais espaços, e o insere no stream `ost`. O caractere de preenchimento e os flags de formatação do stream são ignorados e não são afetados. 

2) Restaura o estado interno do adaptador de motor de números pseudoaleatórios `e` a partir da representação serializada, que foi criada por uma chamada anterior a `operator<<` usando um stream com o mesmo locale imbuído e os mesmos `CharT` e `Traits`. Se a entrada não puder ser desserializada, `e` é deixado inalterado e `failbit` é levantado em `ist`.

Esses function templates não são visíveis para `unqualified` ou `qualified lookup` comum, e só podem ser encontrados por `argument-dependent lookup` quando `std::discard_block_engine<Engine, p, r>` é uma classe associada dos argumentos. 

Se uma representação textual é escrita usando `os << x` e essa representação é restaurada no mesmo ou em um objeto `y` diferente do mesmo tipo usando `is >> y`, então `x == y`. 

| Esta seção está incompleta  
Razão: o padrão também define em que consiste a representação textual   
  
### Parâmetros

ost  |  \-  |  stream de saída para inserir os dados   
---|---|---
ist  |  \-  |  stream de entrada para extrair os dados   
e  |  \-  |  adaptador de motor para serializar ou restaurar   
  
### Valor de retorno

1) ost

2) ist

### Complexidade

| Esta seção está incompleta   
  
### Exceções

1) Pode lançar exceções definidas pela implementação.

2) Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) ao definir `failbit`.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3519](<https://cplusplus.github.io/LWG/issue3519>) | C++11  | a forma dos operadores de inserção e extração era não especificada  | especificado para serem hidden friends 