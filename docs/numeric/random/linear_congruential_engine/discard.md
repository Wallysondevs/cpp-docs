# std::linear_congruential_engine&lt;UIntType,a,c,m&gt;::discard

void discard( unsigned long long z );

  
Avança o estado interno z vezes. 

### Parâmetros

z  |  \-  |  valor inteiro especificando o número de vezes para avançar o estado   
  
### Complexidade

Não pior que a complexidade de z chamadas consecutivas a [operator()](<#/>). 

### Notas

Esta função pode usar algoritmos de “salto rápido” que avançam o estado por muitos passos (da ordem de milhões) sem calcular transições de estado intermediárias, podendo ser usados em vez de loops ingênuos que chamam [operator()](<#/>) z vezes e descartam o resultado. 

### Veja também

[ operator()](<#/>) |  avança o estado do motor e retorna o valor gerado   
(função membro pública)  