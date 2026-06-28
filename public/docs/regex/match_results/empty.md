# std::match_results&lt;BidirIt,Alloc&gt;::empty

bool empty() const; | | (desde C++11)

Verifica se a correspondência foi bem-sucedida.

### Parâmetros

(nenhum)

### Valor de retorno

true se *this representa o resultado de uma correspondência falha, false caso contrário, ou seja, size() == 0.

### Exceções

Pode lançar exceções definidas pela implementação.

### Complexidade

Constante.

### Veja também

[ size](<#/doc/regex/match_results/size>) | retorna o número de correspondências em um estado de resultado totalmente estabelecido
(função membro pública)